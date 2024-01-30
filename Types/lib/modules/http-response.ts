interface IHttpResponse<T = any> {
  code: number
  data: T | null
  message: string
}

class ResponseOK<T = any> implements IHttpResponse {
  code: number = 0
  data: T | null = null
  message: string = ''

  constructor (data: T | null = null, code: number = 0, message: string = 'OK') {
    this.data = data
    this.code = code
    this.message = message
  }
}

export {
  ResponseOK
}

export type {
  IHttpResponse
}
