interface IFile {
  url?: string
  name?: string
  stream?: () => ReadableStream<Uint8Array>
}

export {
  IFile
}
