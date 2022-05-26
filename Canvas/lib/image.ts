import { getContext } from './canvas'

/**
 * Draw image on canvas.
 *
 * @param imgOrUrl Image object or image url.
 * @param canvas Target canvas.
 * @param x Position x.
 * @param y Position y.
 */
function drawImage (imgOrUrl: string | HTMLImageElement | HTMLCanvasElement, canvas: HTMLCanvasElement, x?: number, y?: number) {
  return new Promise<void>((resolve, reject) => {
    const context = getContext(canvas)
    const draw = (image: HTMLImageElement | HTMLCanvasElement) => context.drawImage(image, x ?? 0, y ?? 0)

    if (typeof imgOrUrl === 'string') {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        draw(image)
        resolve()
      }
      image.onerror = () => {
        reject(new Error('Failed to load image ' + imgOrUrl))
      }
      image.src = imgOrUrl
    } else {
      draw(imgOrUrl)
    }
  })
}

/**
 * Create a canvas and put target image into it with stretch sizing behavior.
 *
 * @param options
 */
async function createStretchUniformImage (options: {
  canvasWidth: number,
  canvasHeight: number,
  imageUrl: string,
  isXCentered?: boolean,
  isYCentered?: boolean
}): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvasWidth = options.canvasWidth
    const canvasHeight = options.canvasHeight
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const context = getContext(canvas)
    const image = new Image()
    const imageUrl = options.imageUrl

    image.crossOrigin = 'anonymous'

    image.onload = () => {
      let imageWidth = image.width
      let imageHeight = image.height
      const imageRatio = imageWidth / imageHeight

      imageWidth = canvasWidth
      imageHeight = imageWidth / imageRatio

      if (imageHeight < canvasHeight) {
        imageHeight = canvasHeight
        imageWidth = imageRatio * imageHeight
      }

      let x = 0
      let y = 0
      if (options.isXCentered) {
        x = Math.floor((canvasWidth - imageWidth) / 2)
      }

      if (options.isYCentered) {
        y = Math.floor((canvasHeight - imageHeight) / 2)
      }

      context.drawImage(image, x, y, imageWidth, imageHeight)
      resolve(canvas)
    }

    image.onerror = () => {
      reject(new Error('Failed to load image ' + imageUrl))
    }

    image.src = imageUrl
  })
}

export {
  drawImage,
  createStretchUniformImage
}
