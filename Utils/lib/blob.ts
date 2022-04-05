/**
 * 将 Base64 转换为 Blob.
 *
 * @param {string} base64
 * @returns {Blob}
 */
function base64ToBlob (base64: string): Blob {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const buffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(buffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([buffer], { type: mimeString })
}

/**
 * 将 Blob 转换为 Base64.
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToBase64 (blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', event => {
      const base64: string = (event.target as any).result
      resolve(base64)
    })

    try {
      fileReader.readAsDataURL(blob)
    } catch (error) {
      reject(error)
    }
  })
}

export {
  base64ToBlob,
  blobToBase64
}
