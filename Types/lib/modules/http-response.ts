function isString (target: unknown): target is string {
  return typeof target === 'string'
}

function isNumber (target: unknown): target is number {
  return typeof target === 'number'
}

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
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'BAD_REQUEST'
    let status: number = 400
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
    super(status, message)
  }
}

class ParamIncorrect extends HttpExceptionBase {
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'PARAM_INCORRECT'
    let status: number = 400
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
    super(status, message)
  }
}

class Unauthorized extends HttpExceptionBase {
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'UNAUTHORIZED'
    let status: number = 401
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
    super(status, message)
  }
}

class Forbidden extends HttpExceptionBase {
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'FORBIDDEN'
    let status: number = 403
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
    super(status, message)
  }
}

class NotFound extends HttpExceptionBase {
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'NOT_FOUND'
    let status: number = 404
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
    super(status, message)
  }
}

class InternalError extends HttpExceptionBase {
  constructor (status?: number, message?: string)
  constructor (message?: string)
  constructor (...args: unknown[]) {
    let message: string = 'INTERNAL_ERROR'
    let status: number = 500
    if (args.length === 1) {
      const [arg] = args
      if (isString(arg)) {
        message = arg
      }
    } else if (args.length === 2) {
      const [arg0, arg1] = args
      if (isNumber(arg0)) { status = arg0 }
      if (isString(arg1)) { message = arg1 }
    }
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
