/**
 * 加载图片.
 *
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('Failed to load image ' + url))
    }
    image.src = url
  })
}

/**
 * 使用 File 对象创建 HTMLImageElement.
 * File 必须为图片文件才能正常工作.
 *
 * @param {File} file 图片文件.
 * @returns {Promise<HTMLImageElement>} 图片节点.
 */
function createImageByFile (file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  return loadImage(url)
}

/**
 * 通过图片创建 ImageData.
 *
 * @param {HTMLImageElement} image
 * @returns {ImageData}
 */
function createImageData (image: HTMLImageElement): ImageData | undefined {
  const { width, height } = image

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context?.drawImage(image, 0, 0)

  return context?.getImageData(0, 0, width, height)
}

/**
 * 是否支持 WebP.
 *
 * @returns {boolean}
 */
function isSupportWebp (): boolean {
  // 某些 Android 浏览器不兹词 toDataURL.
  // SSR 环境下加入 try 进行容错.
  try {
    const canvas = document.createElement('canvas')
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export {
  createImageByFile,
  createImageData,
  isSupportWebp,
  loadImage
}
