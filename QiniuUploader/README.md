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
  --qiniu-bucket some-bucket
```

`qiniu-access-key`, `qiniu-secret-key`, `qiniu-bucket` can be replaced with the system environments `QINIU_ACCESS_KEY`, `QINIU_SECRET_KEY`, `QINIU_BUCKET`.
