abstract class FileSystemService {
  static async showSaveFilePicker (options: { suggestedName: string }) {
    if ('showSaveFilePicker' in window) {
      // @ts-ignore
      return window.showSaveFilePicker(options)
    }
    return null
  }
}

export {
  FileSystemService
}
