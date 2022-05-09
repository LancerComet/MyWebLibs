# The Grand Painter

[![npm version](https://badge.fury.io/js/@lancercomet%2Fgrand-painter.svg)](https://badge.fury.io/js/@lancercomet%2Fgrand-painter)

Draw images on canvas with layer effects.

![header-image](https://raw.githubusercontent.com/LancerComet/MyWebLibs/master/GrandPainter/image.jpg)

## Quick start

```typescript
import { paint, Processors } from 'the-grand-painter'

const stageElement = document.getElementById('stage') as HTMLCanvasElement
const imageElement = new Image()

// Put an image on a canvas.
paint({
  stage: stageElement,
  image: imageElement,
  x: 50, 
  y: 50,
  processor: Processors.Normal()
})

// "Overlay" a image on a canvas.
GrandPainter.feelTheUniverse({
  stage: stageElement,
  image: imageElement,
  x: 50, 
  y: 50,
  processor: Processors.Overlay()
})
```

## Processor List

 - ColorBurn
 - ColorDodge
 - Darken
 - Dissolve
 - Lighten
 - LighterColor
 - LinearBurn
 - LinearDodge
 - Multiply
 - Normal
 - Overlay
 - Screen
 - Softlight

## Example

Check examples in `dev/` for more information.

## License

Apache-2.0
