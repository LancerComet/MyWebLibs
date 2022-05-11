import { SimpleSaver } from '../lib'

const ss = new SimpleSaver({
  files: [
    {
      url: 'https://i0.hdslb.com/bfs/comic-static/64eb5c3fea1e7bf222fe20593c11b26180d299cd.jpg',
      name: '1.jpg'
    },
    {
      url: 'https://i0.hdslb.com/bfs/comic-static/2ee797df36f35fa042dd8dcec520b7290f1cd0c1.jpg',
      name: '2.jpg'
    }
  ]
})

const batchStreamSaver = document.getElementById('stream-saver')
batchStreamSaver.onclick = () => ss.saveAs('kayne')
