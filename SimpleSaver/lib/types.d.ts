interface IFile {
  url?: string
  name: string
  file?: () => ReadableStream<Uint8Array>
}

export {
  IFile
}
