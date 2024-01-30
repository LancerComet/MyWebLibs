import { ResponseOK } from '../lib'

describe('HttpResponse test.', () => {
  it('should create an instance with default parameters', () => {
    const response = new ResponseOK()
    expect(response.code).toBe(0)
    expect(response.data).toBeNull()
    expect(response.message).toBe('OK')
  })

  it('should create an instance with custom data', () => {
    const testData = { key: 'value' }
    const response = new ResponseOK(testData)
    expect(response.data).toEqual(testData)
  })

  it('should create an instance with a custom code', () => {
    const testCode = 200
    const response = new ResponseOK(null, testCode)
    expect(response.code).toBe(testCode)
  })

  it('should create an instance with a custom message', () => {
    const testMessage = 'Success'
    const response = new ResponseOK(null, 0, testMessage)
    expect(response.message).toBe(testMessage)
  })

  it('should have properties that match the provided arguments', () => {
    const testData = { key: 'value' }
    const testCode = 200
    const testMessage = 'Success'
    const response = new ResponseOK(testData, testCode, testMessage)
    expect(response.data).toEqual(testData)
    expect(response.code).toBe(testCode)
    expect(response.message).toBe(testMessage)
  })
})
