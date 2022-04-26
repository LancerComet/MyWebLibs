import * as Processors from './processor'
import { Processor } from './processor/type'

/**
 * Let's paint.
 */
const paint = (params: {
  /**
   * The canvas that you want to draw on.
   */
  stage: HTMLCanvasElement,

  /**
   * The image that you want to draw on canvas.
   */
  image: HTMLImageElement | HTMLCanvasElement

  /**
   * Image position x.
   */
  x: number

  /**
   * Image position y.
   */
  y: number

  /**
   * Painting processor.
   */
  processor: Processor
}) => {
  if (!params) {
    return
  }

  const { stage, image, processor } = params
  const x = params.x ?? 0
  const y = params.y ?? 0

  if (!stage || !image || typeof processor !== 'function') {
    return
  }

  processor({ stage, image, x, y })
}

export {
  paint,
  Processors
}
