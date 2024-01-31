interface IHttpResponse<T = any> {
  code: number
  data: T | null
  message: string
}

interface IHttpException {
  status: number
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

class HttpExceptionBase implements IHttpException {
  status: number = 0
  message: string = ''

  constructor (status: number, message: string) {
    this.status = status
    this.message = message
  }
}

class BadRequest extends HttpExceptionBase {
  constructor (status: number = 400, message: string = 'BAD_REQUEST') {
    super(status, message)
  }
}

class ParamIncorrect extends HttpExceptionBase {
  constructor (status: number = 400, message: string = 'PARAM_INCORRECT') {
    super(status, message)
  }
}

class Unauthorized extends HttpExceptionBase {
  constructor (status: number = 401, message: string = 'UNAUTHORIZED') {
    super(status, message)
  }
}

class Forbidden extends HttpExceptionBase {
  constructor (status: number = 403, message: string = 'FORBIDDEN') {
    super(status, message)
  }
}

class NotFound extends HttpExceptionBase {
  constructor (status: number = 404, message: string = 'NOT_FOUND') {
    super(status, message)
  }
}

class InternalError extends HttpExceptionBase {
  constructor (status: number = 500, message: string = 'INTERNAL_ERROR') {
    super(status, message)
  }
}

export {
  ResponseOK,
  BadRequest,
  ParamIncorrect,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalError
}

export type {
  IHttpResponse,
  IHttpException
}
