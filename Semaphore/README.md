# @lancercomet/lib.semaphore

This is a simple semaphore implementation.

## Quick start

```ts
import { Semaphore } from '@lancercomet/lib.semaphore'

// A semaphore with available and max count in 3.
const semaphore = new Semaphore(3, 3)

// Download 3 images at same time.
const downloadImage = async (imageUrl: string) => {
  await semaphore.waitAsync()
  // Do some download work...
  semaphore.release()
}

const imageList: string[] = []
imageList.forEach(imageUrl => downloadImage(imageUrl))
```
