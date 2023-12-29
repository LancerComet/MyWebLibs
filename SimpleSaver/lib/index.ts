import { IFile, IOpts } from './types'
import streamSaver from 'streamsaver'
import { Writer } from './compress'
import { ModernReadableStream } from './readable-stream'
import { FileSystemService } from './fileSystem'

class SimpleSaver {
  private useFileSystem: boolean = false

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
    let fileStream = streamSaver.createWriteStream(file.name)
    const stream = file.stream

    if (this.useFileSystem) {
      const handle = await FileSystemService.showSaveFilePicker({
        suggestedName: file.name
      })
      if (handle) {
        fileStream = await handle.createWritable()
      } else {
        console.warn('Your browser is not support filesystem api.')
      }
    }

    if (file.url) {
      const { body } = await fetch(file.url)
      return body.pipeTo(fileStream)
    }

    return stream().pipeTo(fileStream)
  }

  private appendDependencyScripts () {
    const sp = document.getElementById('sp') as HTMLScriptElement
    const ss = document.getElementById('ss') as HTMLScriptElement
    if (sp && ss) { return }
    const ponyfill = document.createElement('script')
    ponyfill.src = 'https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js'
    ponyfill.id = 'sp'
    const streamsaver = document.createElement('script')
    streamsaver.src = 'https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.min.js'
    streamsaver.id = 'ss'
    document.body.appendChild(ponyfill)
    document.body.appendChild(streamsaver)
  }

  constructor (opt?: IOpts) {
    this.useFileSystem = opt?.useFileSystem ?? false
    this.appendDependencyScripts()
  }
}

export {
  SimpleSaver
}
