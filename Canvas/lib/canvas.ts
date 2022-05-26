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

export {
  createCanvas,
  getContext,
  fillColor,
  createCanvasByImageUrl,
  circlizeCanvas
}
