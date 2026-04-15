#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import https from 'https'
import qiniu from 'qiniu'
import { program } from 'commander'
import assert from 'assert'
import { config } from 'dotenv'

config()

program
  .option('--upload-folder <char>', '需要上传的文件夹路径.')
  .option('--qiniu-base-path <char>', '文件在七牛 Bucket 下的存放路径.')
  .option('--qiniu-bucket <char>', '七牛的 Bucket 名称.')
  .option('--qiniu-access-key <char>', '七牛 Access Key.')
  .option('--qiniu-secret-key <char>', '七牛 Secret Key.')
  .option('--prefetch', '上传完成后执行 DCDN 预取.')
  .option('--prefetch-domain <char>', '预取使用的 CDN 域名, 如 https://cdn.example.com.')
  .option('--prefetch-product <char>', '预取产品类型, 默认 dcdn.', 'dcdn')

program.parse()

const options = program.opts()
let distDirPath = options.uploadFolder
const qiniuBucket = options.qiniuBucket || process.env.QINIU_BUCKET
const qiniuAccessKey = options.qiniuAccessKey || process.env.QINIU_ACCESS_KEY
const qiniuSecretKey = options.qiniuSecretKey || process.env.QINIU_SECRET_KEY
const qiniuBasePath = options.qiniuBasePath
const prefetchEnabled = !!options.prefetch
const prefetchDomain = options.prefetchDomain || process.env.QINIU_PREFETCH_DOMAIN
const prefetchProduct = options.prefetchProduct

assert(distDirPath, '--upload-folder 未指定.')
assert(qiniuBucket, '--qiniu-bucket 未指定.')
assert(qiniuAccessKey, '--qiniu-access-key 未指定.')
assert(qiniuSecretKey, '--qiniu-secret-key 未指定.')
assert(qiniuBasePath, '--qiniu-base-path 未指定.')

if (prefetchEnabled) {
  assert(prefetchDomain, '--prefetch-domain 未指定, 启用 --prefetch 时必须提供.')
}

distDirPath = path.resolve(process.cwd(), distDirPath)

// ============================================================
// Upload.
// ============================================================

const uploadedKeys = []

const walkDir = async (dirPath) => {
  for (const filename of fs.readdirSync(dirPath)) {
    const filePath = path.resolve(dirPath, filename)
    const isDir = fs.statSync(filePath).isDirectory()
    if (isDir) {
      await walkDir(filePath)
      continue
    }

    if (filename.toLowerCase().endsWith('.html')) {
      continue
    }

    const stream = fs.createReadStream(filePath)
    const relativePath = dirPath.replace(distDirPath, '')

    const key = path
      .join(qiniuBasePath, relativePath, filename)
      .replaceAll('\\', '/')

    console.log(`Upload ${key} ...`)

    const putPolicy = new qiniu.rs.PutPolicy({
      scope: qiniuBucket
    })
    const mac = new qiniu.auth.digest.Mac(
      qiniuAccessKey,
      qiniuSecretKey
    )
    const uploadToken = putPolicy.uploadToken(mac)
    const putExtra = new qiniu.form_up.PutExtra()
    const uploadConfig = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z0
    })
    const formUploader = new qiniu.form_up.FormUploader(uploadConfig)
    const uploadResult = await formUploader.putStream(uploadToken, key, stream, putExtra, () => {
      // ...
    })
    const uploadedKey = uploadResult.data.key
    if (uploadedKey) {
      console.log('Upload done, key:', uploadedKey)
      uploadedKeys.push(uploadedKey)
    } else {
      console.error('No key was returned from Qiniu, upload may failed.')
    }
  }
}

// ============================================================
// Prefetch.
// ============================================================

/**
 * Generate QBox access token.
 * QBox signing only signs the request path, not the body.
 *
 * @param {string} apiPath - The API path, e.g. "/v2/tune/prefetch".
 * @param {string} accessKey
 * @param {string} secretKey
 * @returns {string} The full Authorization header value.
 */
const generateQBoxToken = (apiPath, accessKey, secretKey) => {
  const signingStr = apiPath + '\n'
  const sign = crypto
    .createHmac('sha1', secretKey)
    .update(signingStr)
    .digest('base64')
  const safeSign = sign
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return `QBox ${accessKey}:${safeSign}`
}

/**
 * Send a prefetch request to Qiniu DCDN.
 *
 * @param {string[]} urls - URLs to prefetch, max 60.
 * @param {{accessKey: string, secretKey: string, product: string}} param
 * @returns {Promise<{code: number, error: string, requestId: string, invalidUrls: string[]|null, quotaDay: number, surplusDay: number}>}
 */
const sendPrefetchRequest = (urls, { accessKey, secretKey, product }) => {
  const apiPath = '/v2/tune/prefetch'
  const token = generateQBoxToken(apiPath, accessKey, secretKey)
  const body = JSON.stringify({ urls, product })

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'fusion.qiniuapi.com',
      port: 443,
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        Authorization: token
      }
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch {
          reject(new Error(`Failed to parse prefetch response: ${data}`))
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Prefetch all URLs in batches.
 * Each batch contains at most 60 URLs, with 1 second interval between batches.
 * Retries up to 3 times on QPS limit (403024) or server error (500000).
 *
 * @param {string[]} allUrls
 * @param {{accessKey: string, secretKey: string, product: string}} param
 */
const prefetchAllUrls = async (allUrls, { accessKey, secretKey, product }) => {
  const batchSize = 60
  const maxRetries = 3
  const batches = []

  for (let i = 0; i < allUrls.length; i += batchSize) {
    batches.push(allUrls.slice(i, i + batchSize))
  }

  console.log(`Prefetching ${allUrls.length} URL(s) in ${batches.length} batch(es) ...`)

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    let retries = 0
    let success = false

    while (retries <= maxRetries && !success) {
      if (retries > 0) {
        const delay = retries * 2000
        console.log(`  Retry ${retries}/${maxRetries} after ${delay}ms ...`)
        await sleep(delay)
      }

      const result = await sendPrefetchRequest(batch, { accessKey, secretKey, product })

      if (result.code === 200) {
        console.log(
          `  Batch ${i + 1}/${batches.length}: ${batch.length} URL(s) prefetched.` +
          ` RequestId: ${result.requestId}.` +
          ` Quota: ${result.surplusDay}/${result.quotaDay}.`
        )
        success = true
      } else if (result.code === 400033) {
        console.error(`  Batch ${i + 1}: Daily prefetch quota exceeded. Stopping.`)
        return
      } else if ((result.code === 403024 || result.code === 500000) && retries < maxRetries) {
        console.warn(`  Batch ${i + 1}: [${result.code}] ${result.error}, will retry.`)
        retries++
      } else {
        console.error(`  Batch ${i + 1}: Failed. [${result.code}] ${result.error}`)
        if (result.invalidUrls && result.invalidUrls.length > 0) {
          console.error(`  Invalid URLs: ${result.invalidUrls.join(', ')}`)
        }
        success = true // Move on to next batch.
      }
    }

    // Rate limit: wait 1 second between batches to stay within 60 URL/s.
    if (i < batches.length - 1) {
      await sleep(1000)
    }
  }
}

// ============================================================
// Main.
// ============================================================

const main = async () => {
  await walkDir(distDirPath)

  if (prefetchEnabled) {
    if (uploadedKeys.length < 1) {
      console.log('\nNo files were uploaded, skipping prefetch.')
      return
    }

    const domain = prefetchDomain.replace(/\/+$/, '')
    const urls = uploadedKeys.map((key) => `${domain}/${key}`)

    console.log(`\nUpload completed. Starting prefetch for ${urls.length} URL(s) ...`)
    await prefetchAllUrls(urls, {
      accessKey: qiniuAccessKey,
      secretKey: qiniuSecretKey,
      product: prefetchProduct
    })
    console.log('Prefetch completed.')
  }
}

main()
  .catch(console.error)
