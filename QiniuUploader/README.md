# Qiniu Uploader

This tool is used for uploading assets to the Qiniu CDN.

## Quick start

```
npm install @lancercomet/qiniu-uploader --save-dev
```

```
npx qiniu-uploader --upload-folder dist \
  --qiniu-base-path some-folder-on-qiniu/sub-directory \
  --qiniu-access-key *** \
  --qiniu-secret-key *** \
  --qiniu-bucket some-bucket \
  --prefetch \
  --prefetch-domain https://cdn.example.com
```

`qiniu-access-key`, `qiniu-secret-key`, `qiniu-bucket` can be replaced with the system environments `QINIU_ACCESS_KEY`, `QINIU_SECRET_KEY`, `QINIU_BUCKET`.

## Prefetch

When `--prefetch` is enabled, all successfully uploaded file URLs will be submitted to Qiniu DCDN for prefetching (cache warming) after the upload is completed.

### Options

| Option | Description | Required |
|---|---|---|
| `--prefetch` | Enable DCDN prefetch after upload. | No |
| `--prefetch-domain <url>` | The CDN domain for constructing prefetch URLs, e.g. `https://cdn.example.com`. | Yes (when `--prefetch` is enabled) |
| `--prefetch-product <str>` | The prefetch product type, defaults to `dcdn`. | No |

`prefetch-domain` can also be set via the environment variable `QINIU_PREFETCH_DOMAIN`.

### How it works

- URLs are submitted in batches of 60 (Qiniu API limit).
- A 1-second interval is applied between batches to respect the rate limit.
- On QPS throttling (403024) or server errors (500000), the batch will be retried up to 3 times with exponential backoff.
