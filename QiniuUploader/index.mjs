#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import qiniu from 'qiniu'
import { program } from 'commander'
import assert from 'assert'

program
  .option('--upload-folder <char>', '需要上传的文件夹路径.')
  .option('--qiniu-base-path <char>', '文件在七牛 Bucket 下的存放路径.')
  .option('--qiniu-bucket <char>', '七牛的 Bucket 名称.')
  .option('--qiniu-access-key <char>', '七牛 Access Key.')
  .option('--qiniu-secret-key <char>', '七牛 Secret Key.')

program.parse()

const options = program.opts()
let distDirPath = options.uploadFolder
const qiniuBucket = options.qiniuBucket || process.env.QINIU_BUCKET
const qiniuAccessKey = options.qiniuAccessKey || process.env.QINIU_ACCESS_KEY
const qiniuSecretKey = options.qiniuSecretKey || process.env.QINIU_SECRET_KEY
const qiniuBasePath = options.qiniuBasePath

assert(distDirPath, '--upload-folder 未指定.')
assert(qiniuBucket, '--qiniu-bucket 未指定.')
assert(qiniuAccessKey, '--qiniu-access-key 未指定.')
assert(qiniuSecretKey, '--qiniu-secret-key 未指定.')
assert(qiniuBasePath, '--qiniu-base-path 未指定.')

distDirPath = path.resolve(process.cwd(), distDirPath)

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
    const config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z0
    })
    const formUploader = new qiniu.form_up.FormUploader(config)
    const uploadResult= await formUploader.putStream(uploadToken, key, stream, putExtra, () => {
      // ...
    })
    console.log('Upload done, key:', uploadResult.data.key)
  }
}

walkDir(distDirPath)
  .catch(console.error)

