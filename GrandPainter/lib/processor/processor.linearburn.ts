/*
 * LinearBurn (线性加深).
 * Math.max(0, stage pixel color + overlay pixel color - 255)
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const linearBurn = (stageColor: number, overlayColor: number) => {
  return Math.max(0, stageColor + overlayColor - 255)
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, linearBurn, true)
}

const LinearBurn = () => {
  return exec
}

export {
  LinearBurn
}
