/*
 * Lighten (变亮).
 * Math.max(overlay pixel color, stage pixel color)
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const lighten = (stageColor: number, overlayColor: number) => {
  return Math.max(stageColor, overlayColor)
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, lighten, true)
}

const Lighten = () => {
  return exec
}

export {
  Lighten
}
