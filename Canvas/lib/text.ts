import { createCanvas, getContext } from './canvas'

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

export {
  createTextCanvas,
  getMeasuredText
}
