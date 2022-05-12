import { SimpleSaver } from '../lib'

const bs = new SimpleSaver()
const ss = new SimpleSaver()

const batchStreamSaver = document.getElementById('stream-saver')
const batchFilename = document.getElementById('stream-saver-filename') as HTMLInputElement
batchStreamSaver.onclick = () => {
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
  return bs.saveFilesAs(batchFilename.value, files)
}

const singleStreamSaver = document.getElementById('stream-saver-single')
const singleFilename = document.getElementById('stream-saver-single-filename') as HTMLInputElement
singleStreamSaver.onclick = () => {
  const file = {
    name: singleFilename.value,
    stream: () => new Response('Kayne!!!').body
  }
  return ss.saveFileAs(file)
}
