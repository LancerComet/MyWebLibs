import { ReadableStream as ReadableStreamPonyfill } from 'web-streams-polyfill/ponyfill'

const ModernReadableStream = window.WritableStream
  ? window.ReadableStream
  : ReadableStreamPonyfill

export {
  ModernReadableStream
}
