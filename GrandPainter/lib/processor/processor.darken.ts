/*
 * Darken (变暗).
 * Math.min(overlay pixel color, stage pixel color)
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const darken = (stageColor: number, overlayColor: number) => {
  return Math.min(stageColor, overlayColor)
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, darken, true)
}

const Darken = () => {
  return exec
}

export {
  Darken
}
