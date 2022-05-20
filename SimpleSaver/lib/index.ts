import { IFile } from './types'
import streamSaver from 'streamsaver'
import { Writer } from './compress'
import { ModernReadableStream } from './readable-stream'

class SimpleSaver {
  private async batchSave (filename: string, files: IFile[]) {
    const fileStream = streamSaver.createWriteStream(filename + '.zip')
    const _files = files.values()
    const myReadable = new ModernReadableStream({
      async pull (ctl) {
        const { done, value } = _files.next()
        if (done) ctl.close()
        if (value.url) {
          const { body } = await fetch(value.url)
          return ctl.enqueue({
            name: value.name,
            stream: () => body
          })
        }
        return ctl.enqueue({
          name: value.name,
          stream: value.stream
        })
      }
    })

    return myReadable
      // @ts-ignore
      .pipeThrough(new Writer())
      .pipeTo(fileStream)
  }

  /**
   * Save multi-file.
   *
   * @param filename the zip name.
   * @param files
   */
  saveFilesAs (filename: string, files: IFile[]) {
    if (!files.length) {
      console.warn('You must save one file at least.')
      return
    }
    return this.batchSave(filename, files)
  }

  /**
   * Save file.
   *
   * @param file
   */
  async saveFileAs (file: IFile) {
    const fileStream = streamSaver.createWriteStream(file.name)
    if (file.url) {
      const { body } = await fetch(file.url)
      return body.pipeTo(fileStream)
    }
    const stream = file.stream
    return stream().pipeTo(fileStream)
  }
}

export {
  SimpleSaver
}
