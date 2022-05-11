import { IFile } from './types'
import streamSaver from 'streamsaver'
// import { Writer } from './compress'
import { Writer } from '@transcend-io/conflux'
import { ModernReadableStream } from './readable-stream'

class SimpleSaver {
  private files: IFile[] = []

  private async batchSave (filename: string) {
    const files = this.files.values()
    const fileStream = streamSaver.createWriteStream(filename + '.zip')

    const myReadable = new ModernReadableStream({
      async pull (ctl) {
        const { done, value } = files.next()
        if (done) ctl.close()
        if (value) {
          const { body } = await fetch(value.url)
          return ctl.enqueue({
            name: value.name,
            stream: () => body
          })
        }
      }
    })

    return myReadable
      // @ts-ignore
      .pipeThrough(new Writer())
      .pipeTo(fileStream)
  }

  private async singleSave () {}

  saveAs (filename: string) {
    // multiple file will be ignored suffix.
    if (this.files.length > 1) {
      const _filename = filename.split('.')[0]
      return this.batchSave(_filename)
    }
  }

  constructor (opt: {
    files: IFile[]
  }) {
    this.files = opt.files
  }
}

export {
  SimpleSaver
}
