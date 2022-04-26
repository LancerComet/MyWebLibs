/*
 * ColorBurn (颜色加深).
 * Math.max(0, stage pixel color + overlay pixel color - 255) * 255 / overlay pixel color
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const colorBurn = (stageColor: number, overlayColor: number) => {
  return Math.max(0, stageColor + overlayColor - 255) * 255 / overlayColor
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, colorBurn, true)
}

const ColorBurn = () => {
  return exec
}

export {
  ColorBurn
}
