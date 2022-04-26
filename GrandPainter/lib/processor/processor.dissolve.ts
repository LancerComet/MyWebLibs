/*
 * Dissolve (溶解): draw pixels in random.
 */

import { createCanvas, getContext } from '../utils/canvas'
import { Processor } from './type'

// Cache processors to prevent creating too many.
const cachePool: {[threshold: number]: Processor} = {}

const Dissolve = (threshold: number = 0.5) => {
  if (cachePool[threshold]) {
    return cachePool[threshold]
  }

  const exec: Processor = params => {
    const { stage, image, x, y } = params
    const context = getContext(stage)

    const imageCanvas = createCanvas(image.width, image.height)
    const imageContext = getContext(imageCanvas)
    imageContext.drawImage(image, 0, 0)

    const imageData = imageContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height)
    for (let i = 0, length = imageData.data.length; i < length; i += 4) {
      const index = i + 3
      const a = imageData.data[index]

      const random = Math.random()
      imageData.data[index] = random < threshold ? 0 : a
    }

    imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    imageContext.putImageData(imageData, 0, 0)

    context.drawImage(imageCanvas, x, y)
  }

  cachePool[threshold] = exec
  return exec
}

export {
  Dissolve
}
