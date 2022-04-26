import { paint, Processors } from '../lib'
import { Processor } from '../lib/processor/type'

main()

async function main () {
  const photo = await new Promise<HTMLImageElement>(resolve => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = '/static/images/photo.jpg'
  })

  const logoImage = await new Promise<HTMLImageElement>(resolve => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = '/static/images/logo.jpg'
  })

  createPreviewImage('Normal', Processors.Normal())
  createDissolve()
  createPreviewImage('Darken', Processors.Darken())
  createPreviewImage('Color Burn', Processors.ColorBurn())
  createPreviewImage('Linear Burn', Processors.LinearBurn())
  createPreviewImage('Lighten', Processors.Lighten())
  createPreviewImage('Lighter Color', Processors.LighterColor())
  createPreviewImage('Color Dodge', Processors.ColorDodge())
  createPreviewImage('Linear Dodge', Processors.LinearDodge())
  createMultiply()
  createPreviewImage('Overlay', Processors.Overlay())
  createPreviewImage('Screen', Processors.Screen())
  createPreviewImage('Soft Light', Processors.SoftLight())

  function createDissolve () {
    writeTitle('Dissolve')

    const stage = document.createElement('canvas')
    const context = stage.getContext('2d') as CanvasRenderingContext2D

    stage.width = photo.width
    stage.height = photo.height

    document.body.appendChild(stage)

    const dissolve = Processors.Dissolve(0.3)
    const tick = () => {
      context.clearRect(0, 0, stage.width, stage.height)
      context.drawImage(photo, 0, 0)
      paint({
        stage,
        image: logoImage,
        x: (stage.width - logoImage.width) / 2,
        y: (stage.height - logoImage.height) / 2,
        processor: dissolve
      })
      requestAnimationFrame(tick)
    }

    tick()
  }

  function createMultiply () {
    writeTitle('Multiply')

    const stage = document.createElement('canvas')
    const context = stage.getContext('2d') as CanvasRenderingContext2D

    stage.width = photo.width
    stage.height = photo.height

    document.body.appendChild(stage)

    let x = 0
    let y = 0
    let xDirection = '+'
    let yDirection = '+'
    const speed = 3
    const processor = Processors.Multiply()

    const tick = () => {
      context.clearRect(0, 0, stage.width, stage.height)
      context.drawImage(photo, 0, 0)
      paint({
        stage,
        image: logoImage,
        x,
        y,
        processor
      })

      if (x >= stage.width - logoImage.width) {
        xDirection = '-'
      }

      if (y >= stage.height - logoImage.height) {
        yDirection = '-'
      }

      if (x <= 0) {
        xDirection = '+'
      }

      if (y <= 0) {
        yDirection = '+'
      }

      x = xDirection === '+' ? x + speed : x - speed
      y = yDirection === '+' ? y + speed : y - speed

      requestAnimationFrame(tick)
    }

    tick()
  }

  function createPreviewImage (title: string, processor: Processor) {
    writeTitle(title)

    const stage = document.createElement('canvas')
    const context = stage.getContext('2d') as CanvasRenderingContext2D

    stage.width = photo.width
    stage.height = photo.height

    document.body.appendChild(stage)

    context.drawImage(photo, 0, 0)
    paint({
      stage,
      image: logoImage,
      x: (stage.width - logoImage.width) / 2,
      y: (stage.height - logoImage.height) / 2,
      processor
    })
  }
}

function writeTitle (content: string) {
  const title = document.createElement('h2')
  title.textContent = content
  document.body.appendChild(title)
}
