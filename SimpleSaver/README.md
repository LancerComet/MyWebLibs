# Simple-saver

This library helps you to download multi-file or single file easily, it's dependent on [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) that's an awesome project.

## Features

  - Auto compressed when you choose multiple files.
  - Auto fetch when you set url.

## Quick Start

```shell
$ npm install @kaynewang/simple-saver
```

```js
import { SimpleSaver } from '@kaynewang/simple-saver'

// multi-file save
const bs = new SimpleSaver()
const files = [
  {
    name: 'test.txt',
    stream: () => new Response('Kayne!!!').body
  },
  {
    name: 'test2.txt',
    stream: () => new Response('No.2 Kayne!!!').body
  },
  {
    url: 'https://s3-us-west-2.amazonaws.com/bencmbrook/water.png',
    name: 'water.png'
  },
  {
    url: 'https://s3-us-west-2.amazonaws.com/bencmbrook/Earth.jpg',
    name: 'Earth.jpg'
  },
  {
    url: 'https://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
    name: 'cat.mp4'
  }
]
bs.saveFilesAs(batchFilename.value, files)

// single-file save
const ss = new SimpleSaver()
const file = {
name: 'kayne.txt',
stream: () => new Response('Kayne!!!').body
}
ss.saveFileAs(file)
```

## License

Apache-2.0
