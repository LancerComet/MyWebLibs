/*
 * LinearDodge (线性减淡).
 * Math.max(stage pixel color + overlay pixel color, 255)
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'
import { drawPixel } from './utils'

const linearDodge = (stageColor: number, overlayColor: number) => {
  return Math.min(stageColor + overlayColor, 255)
}

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)
  drawPixel(stage, imageCanvas, x, y, linearDodge, true)
}

const LinearDodge = () => {
  return exec
}

export {
  LinearDodge
}
