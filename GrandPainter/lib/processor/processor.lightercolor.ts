/*
 * Lighter Color (浅色).
 * if (stage.rgba > overlay.rgba) {
 *   return stage
 * } else {
 *   return overlay
 * }
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const imageCanvas = createCanvas(image.width, image.height)
  const imageContext = getContext(imageCanvas)
  imageContext.drawImage(image, 0, 0)

  const imageData = imageContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height)
  const stageContext = getContext(stage)
  const stageImageData = stageContext.getImageData(0, 0, stage.width, stage.height)

  for (let h = 0; h < imageData.height; h++) {
    for (let w = 0; w < imageData.width; w++) {
      const overlayIndex = h * imageData.width + w
      const overlayR = imageData.data[overlayIndex * 4]
      const overlayG = imageData.data[overlayIndex * 4 + 1]
      const overlayB = imageData.data[overlayIndex * 4 + 2]
      const overlayA = imageData.data[overlayIndex * 4 + 3]

      // Get the location in stage.
      const stageIndex = (y + h) * stageImageData.width + x + w
      const stageR = stageImageData.data[stageIndex * 4]
      const stageG = stageImageData.data[stageIndex * 4 + 1]
      const stageB = stageImageData.data[stageIndex * 4 + 2]
      const stageA = stageImageData.data[stageIndex * 4 + 3]

      const countOverlay = overlayR + overlayG + overlayB + overlayA
      const countStage = stageR + stageG + stageB + stageA
      const isUseStageColor = countStage >= countOverlay

      imageData.data[overlayIndex * 4] = isUseStageColor ? stageR : overlayR
      imageData.data[overlayIndex * 4 + 1] = isUseStageColor ? stageG : overlayG
      imageData.data[overlayIndex * 4 + 2] = isUseStageColor ? stageB : overlayB
      imageData.data[overlayIndex * 4 + 3] = isUseStageColor ? stageA : overlayA
    }
  }

  imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
  imageContext.putImageData(imageData, 0, 0)

  stageContext.drawImage(imageCanvas, x, y)
}

const LighterColor = () => {
  return exec
}

export {
  LighterColor
}
