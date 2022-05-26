import { borderImage, createCanvasByImageUrl, drawImage } from '../lib'

(async () => {
  const canvas = document.getElementById('app-canvas') as HTMLCanvasElement

  const image = await createCanvasByImageUrl('/test.png')
  const borderedImage = borderImage(image, 5, 'red')

  await drawImage(borderedImage, canvas, 0, 0)
})()
