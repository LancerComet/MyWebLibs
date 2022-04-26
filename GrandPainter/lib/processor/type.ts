type Processor = (params: {
  stage: HTMLCanvasElement
  image: HTMLImageElement | HTMLCanvasElement
  x: number
  y: number
}) => void

export {
  Processor
}
