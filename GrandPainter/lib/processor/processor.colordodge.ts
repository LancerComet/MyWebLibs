/*
 * ColorDodge (颜色减淡).
 * stage pixel color + overlay pixel color * stage pixel color / (255 - overlay pixel color)
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const colorDodge = (stageColor: number, overlayColor: number) => {
  return stageColor + overlayColor * stageColor / (255 - overlayColor)
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, colorDodge, true)
}

const ColorDodge = () => {
  return exec
}

export {
  ColorDodge
}
