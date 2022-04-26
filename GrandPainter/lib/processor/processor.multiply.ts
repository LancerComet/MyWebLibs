/*
 * Multiply (正片叠底).
 * overlay pixel color * stage pixel color / 255.
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const multiply = (stageColor: number, overlayColor: number) => {
  return overlayColor * stageColor / 255
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, multiply)
}

const Multiply = () => {
  return exec
}

export {
  Multiply
}
