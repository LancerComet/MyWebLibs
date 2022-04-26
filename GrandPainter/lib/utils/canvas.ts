function createCanvas (width?: number, height?: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  if (typeof width === 'number') {
    canvas.width = width
  }

  if (typeof height === 'number') {
    canvas.height = height
  }

  return canvas
}

function getContext (canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return canvas.getContext('2d') as CanvasRenderingContext2D
}

export {
  createCanvas,
  getContext,
}
