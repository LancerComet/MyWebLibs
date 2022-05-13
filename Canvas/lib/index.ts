/**
 * Create canvas.
 *
 * @param width
 * @param height
 */
function createCanvas (width?: number, height?: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  if (typeof width === 'number') {
    canvas.width = width
  }
  if (typeof height === 'number') {
    canvas.height = height
  }
  return canvas
}

/**
 * Get canvas context.
 *
 * @param canvas
 */
function getContext (canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return canvas.getContext('2d')
}

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
 * Create a canvas by using an image url.
 *
 * @param url Image url.
 */
function createCanvasByImageUrl (url: string): Promise<HTMLCanvasElement> {
  return new Promise<HTMLCanvasElement>((resolve, reject) => {
    const canvas = createCanvas()
    const context = getContext(canvas)

    const image = new Image()

    image.crossOrigin = 'anonymous'

    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
      resolve(canvas)
    }

    image.onerror = () => {
      reject(new Error('Failed to load image ' + url))
    }

    image.src = url
  })
}

/**
 * Get the text with specific measuring.
 * The overflowed text would be ends with "...".
 *
 * @param options
 */
function getMeasuredText (options: {
  text: string,
  fontWeight: string,
  fontFamily: string,
  fontSize: number,
  maxWidth: number
}): string {
  const { fontSize, fontFamily, fontWeight, maxWidth } = options
  let text = options.text

  const canvas = createCanvas()
  const context = getContext(canvas)

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`

  let textWidth = context.measureText(text).width
  if (textWidth <= maxWidth) {
    return text
  }

  const ellipsis = '...'
  const ellipsisWidth = context.measureText(ellipsis).width
  let textLength = text.length
  while (textWidth >= maxWidth - ellipsisWidth && textLength > 0) {
    text = text.substring(0, textLength)
    textWidth = context.measureText(text).width
    textLength--
  }

  return text + ellipsis
}

/**
 * Create a canvas which contains the specific text.
 *
 * @param options
 */
function createTextCanvas (options: {
  text: string,
  textColor: string,
  fontFamily: string,
  fontSize: number,
  fontWeight?: string,
  blurSize?: number,
  useStroke?: boolean
}): HTMLCanvasElement {
  const {
    text, fontFamily, fontSize, textColor, blurSize,
    useStroke
  } = options
  const fontWeight = options.fontWeight || 'normal'

  const canvas = createCanvas()
  const context = canvas.getContext('2d')

  // For text measuring.
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`

  const textHeight = fontSize + 2
  const textSize = context.measureText(text)
  canvas.width = textSize.width
  canvas.height = textHeight

  if (typeof blurSize === 'number' && blurSize > 0) {
    context.filter = `blur(${blurSize}px)`
  }

  // For text filling.
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  context.textBaseline = 'bottom'

  if (useStroke) {
    context.strokeStyle = textColor
    context.strokeText(text, 0, textHeight)
  } else {
    context.fillStyle = textColor
    context.fillText(text, 0, textHeight)
  }

  return canvas
}

/**
 * Make canvas a circle.
 *
 * @param canvas Target canvas.
 */
function circlizeCanvas (canvas: HTMLCanvasElement) {
  const { width, height } = canvas
  const context = getContext(canvas)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2)
  context.closePath()
  context.fill()
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

/**
 * Fill the full canvas with specified color.
 *
 * @param canvas
 * @param color
 */
function fillColor (canvas: HTMLCanvasElement, color: string) {
  const context = getContext(canvas)
  context.fillStyle = color
  context.fillRect(0, 0, canvas.width, canvas.height)
}

export {
  createCanvas,
  getContext,
  drawImage,
  createCanvasByImageUrl,
  getMeasuredText,
  createTextCanvas,
  circlizeCanvas,
  createStretchUniformImage,
  fillColor
}

export { borderImage } from './border-image'
