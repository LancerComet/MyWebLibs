import { ResponseOK, BadRequest, ParamIncorrect, Unauthorized, Forbidden, NotFound, InternalError } from '../lib'

describe('HttpResponse tests.', () => {
  it('should create an instance with default parameters', () => {
    const response = new ResponseOK()
    expect(response.code).toBe(0)
    expect(response.data).toBeNull()
    expect(response.message).toBe('OK')
  })

  it('should create an instance with custom parameters', () => {
    const data = { key: 'value' }
    const code = 200
    const message = 'Success'
    const response = new ResponseOK(data, code, message)
    expect(response.code).toBe(code)
    expect(response.data).toEqual(data)
    expect(response.message).toBe(message)
  })
})

const exceptionTests = [
  { ExceptionClass: BadRequest, defaultStatus: 400, defaultMessage: 'BAD_REQUEST' },
  { ExceptionClass: ParamIncorrect, defaultStatus: 400, defaultMessage: 'PARAM_INCORRECT' },
  { ExceptionClass: Unauthorized, defaultStatus: 401, defaultMessage: 'UNAUTHORIZED' },
  { ExceptionClass: Forbidden, defaultStatus: 403, defaultMessage: 'FORBIDDEN' },
  { ExceptionClass: NotFound, defaultStatus: 404, defaultMessage: 'NOT_FOUND' },
  { ExceptionClass: InternalError, defaultStatus: 500, defaultMessage: 'INTERNAL_ERROR' }
]

exceptionTests.forEach(({ ExceptionClass, defaultStatus, defaultMessage }) => {
  describe(ExceptionClass.name, () => {
    it('should create an instance with default parameters', () => {
      const exceptionInstance = new ExceptionClass()
      expect(exceptionInstance.status).toBe(defaultStatus)
      expect(exceptionInstance.message).toBe(defaultMessage)
    })

    it('should create an instance with custom parameters', () => {
      const customStatus = defaultStatus + 1 // Example of a custom status
      const customMessage = 'Custom Message'
      const exceptionInstance = new ExceptionClass(customStatus, customMessage)
      expect(exceptionInstance.status).toBe(customStatus)
      expect(exceptionInstance.message).toBe(customMessage)
    })
  })
})
