import { getContext } from '../utils/canvas'
import { Processor } from './type'

const exec: Processor = params => {
  const { stage, image, x, y } = params
  const context = getContext(stage)
  context.drawImage(image, x, y)
}

const Normal = () => {
  return exec
}

export {
  Normal
}
