/*
 * Screen (滤色).
 * 255 - (255 - overlay pixel color) * (255 - stage pixel color) / 255
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const screen = (stageColor: number, overlayColor: number) => {
  return 255 - (255 - overlayColor) * (255 - stageColor) / 255
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, screen, true)
}

const Screen = () => {
  return exec
}

export {
  Screen
}
