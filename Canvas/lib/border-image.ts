/*
 * This code is from:
 * https://stackoverflow.com/questions/28207232/draw-border-around-nontransparent-part-of-image-on-canvas
 */

// Marching Squares Edge Detection
// this is a "marching ants" algorithm used to calc the outline path
// d3-plugin for calculating outline paths
// License: https://github.com/d3/d3-plugins/blob/master/LICENSE
//
// Copyright (c) 2012-2014, Michael Bostock
// All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//* Redistributions of source code must retain the above copyright notice, this
//  list of conditions and the following disclaimer.
//* Redistributions in binary form must reproduce the above copyright notice,
//  this list of conditions and the following disclaimer in the documentation
//  and/or other materials provided with the distribution.
//* The name Michael Bostock may not be used to endorse or promote products
//  derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
const contour = (checkIsNotTransparent: (x: number, y: number) => boolean, start?: [number, number]) => {
  const s = start || d3GeomContourStart(checkIsNotTransparent) // starting point
  const c = [] // contour polygon
  let x = s[0] // current x position
  let y = s[1] // current y position
  let dx = 0 // next x direction
  let dy = 0 // next y direction
  let pdx = NaN // previous x direction
  let pdy = NaN // previous y direction
  let i = 0

  do {
    // determine marching squares index
    i = 0
    if (checkIsNotTransparent(x - 1, y - 1)) i += 1
    if (checkIsNotTransparent(x, y - 1)) i += 2
    if (checkIsNotTransparent(x - 1, y)) i += 4
    if (checkIsNotTransparent(x, y)) i += 8

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1
      dy = 0
    } else if (i === 9) {
      dx = 0
      dy = pdx === 1 ? -1 : 1
    } else {
      dx = d3GeomContourDx[i]
      dy = d3GeomContourDy[i]
    }

    // update contour polygon
    if (dx !== pdx && dy !== pdy) {
      c.push([x, y])
      pdx = dx
      pdy = dy
    }

    x += dx
    y += dy
  } while (s[0] !== x || s[1] !== y)

  return c
}

// lookup tables for marching directions
const d3GeomContourDx = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN]
const d3GeomContourDy = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN]

const d3GeomContourStart = (checkIsNotTransparent: (x: number, y: number) => boolean): [number, number] => {
  let x = 0
  let y = 0

  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals
  while (true) {
    if (checkIsNotTransparent(x, y)) {
      return [x, y]
    }
    if (x === 0) {
      x = y + 1
      y = 0
    } else {
      x = x - 1
      y = y + 1
    }
  }
}

// This is used by the marching ants algorithm
// to determine the outline of the non-transparent
// pixels on the image
const checkIsNotTransparent = (x: number, y: number, canvasWidth: number, imageData: ImageData): boolean => {
  const data = imageData.data
  const a = data[(y * canvasWidth + x) * 4 + 3]
  return a > 20
}

/**
 * Create a bordered image.
 *
 * @param {HTMLImageElement | HTMLCanvasElement} image Target image.
 * @param borderSize Border size, px.
 * @param color Border color.
 */
const borderImage = (image: HTMLImageElement | HTMLCanvasElement, borderSize: number, color: string): HTMLCanvasElement => {
  // This algorithm generates the border half outside, half inside.
  // So we're going to double the border size and overlay the image to get the actually borderSize outline.
  borderSize = borderSize * 2

  const canvas = document.createElement('canvas')
  canvas.width = image.width + borderSize * 2
  canvas.height = image.height + borderSize * 2

  const context = canvas.getContext('2d')

  const drawImage = () => context.drawImage(image, borderSize, borderSize)

  // draw the image
  // this time to grab the image's pixel data
  drawImage()

  // grab the image's pixel data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  // call the marching ants algorithm
  // to get the outline path of the image
  // (outline=outside path of transparent pixels
  const points = contour((x, y) => checkIsNotTransparent(x, y, canvas.width, imageData)) // an array of points that defines the outline path

  // for (const point of points) {
  //   const [x, y] = point
  //
  //   if (x > canvas.width / 2) {
  //     point[0] = x + borderSize / 2
  //   } else {
  //     point[0] = x - borderSize / 2
  //   }
  //
  //   if (y > canvas.height / 2) {
  //     point[1] = y - borderSize / 2
  //   } else {
  //     point[1] = y + borderSize / 2
  //   }
  // }

  context.save()
  context.strokeStyle = color
  context.lineWidth = borderSize

  // redraw the canvas
  // user determines if original-image or outline path or both are visible
  const redraw = () => {
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw the image
    drawImage()

    // draw the path (consisting of connected points)
    // draw outline path
    context.beginPath()
    context.moveTo(points[0][0], points[0][4])
    for (let i = 1; i < points.length; i++) {
      const point = points[i]
      context.lineTo(point[0], point[1])
    }
    context.closePath()
    context.stroke()

    drawImage()
  }

  redraw()
  context.restore()

  return canvas
}

export {
  borderImage
}
