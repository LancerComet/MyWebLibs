/*
 * Overlay (叠加).
 * 255 - (255 - overlay pixel color) * (255 - stage pixel color) / 128.
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const overlay = (stageColor: number, overlayColor: number) => {
  return 255 - (255 - overlayColor) * (255 - stageColor) / 128
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, overlay, true)
}

const Overlay = () => {
  return exec
}

export {
  Overlay
}
