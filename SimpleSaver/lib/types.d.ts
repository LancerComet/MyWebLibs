interface IFile {
  url?: string
  name?: string
  stream?: () => ReadableStream<Uint8Array>
}

interface IOpts {
  useFileSystem?: boolean
}

export {
  IFile,
  IOpts
}
