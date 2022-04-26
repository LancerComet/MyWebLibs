import { getContext } from '../utils/canvas'

function drawPixel (
  stage: HTMLCanvasElement, imageCanvas: HTMLCanvasElement,
  offsetX: number, offsetY: number,
  processor: (stageColor: number, overlayColor: number) => number,
  isSkipTransparentPixel?: boolean
) {
  const imageContext = getContext(imageCanvas)
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
      const stageIndex = (offsetY + h) * stageImageData.width + offsetX + w
      const stageR = stageImageData.data[stageIndex * 4]
      const stageG = stageImageData.data[stageIndex * 4 + 1]
      const stageB = stageImageData.data[stageIndex * 4 + 2]
      const stageA = stageImageData.data[stageIndex * 4 + 3]

      imageData.data[overlayIndex * 4] = processor(stageR, overlayR)
      imageData.data[overlayIndex * 4 + 1] = processor(stageG, overlayG)
      imageData.data[overlayIndex * 4 + 2] = processor(stageB, overlayB)

      const isTransparentPixel = stageA === 255 || overlayA === 255
      if (!isSkipTransparentPixel || !isTransparentPixel) {
        imageData.data[overlayIndex * 4 + 3] = processor(stageA, overlayA)
      }
    }
  }

  imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
  imageContext.putImageData(imageData, 0, 0)

  stageContext.drawImage(imageCanvas, offsetX, offsetY)
}

export {
  drawPixel
}
