/*
 * SoftLight (柔光).
 * stage pixel color + (2 * overlay pixel color - 255) *
 *   (Math.sqrt(stage pixel color / 255) * 255 - stage pixel color) / 255
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const softlight = (stageColor: number, overlayColor: number) => {
  return stageColor + (2 * overlayColor - 255) * (Math.sqrt(stageColor / 255) * 255 - stageColor) / 255
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, softlight, true)
}

const SoftLight = () => {
  return exec
}

export {
  SoftLight
}
