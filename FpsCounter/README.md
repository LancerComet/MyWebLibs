# @lancercomet/fps-counter

[![MyWebLibs](https://github.com/LancerComet/MyWebLibs/workflows/Test/badge.svg)](https://github.com/LancerComet/MyWebLibs/actions)
[![npm version](https://badge.fury.io/js/@lancercomet%2Ffps-counter.svg)](https://badge.fury.io/js/@lancercomet%2Ffps-counter)

A library to read fps.

## Quick start

```ts
import { FpsCounter } from '@lancercomet/fps-counter'

const fpsCounter = new FpsCounter()
const unregisterTick = fpsCounter.onTick((fps: number) => {
  console.log('Fps:', fps)  
})
fpsCounter.start()

// Unregister tick from FpsCounter:
unregisterTick()

// Stop counting:
fpsCounter.stop()

// Read fps directly:
fpsCounter.fps
```

`onTick` triggers every frame.

You can pass use your own throttle function to take it easy. 

## License

Apache-2.0
