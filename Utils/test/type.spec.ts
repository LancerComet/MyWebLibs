import { isNumber } from '../lib/types'

describe('Types 测试.', () => {
  it('isNumber.', () => {
    expect(isNumber(10)).toEqual(true)
    expect(isNumber('')).toEqual(false)
    expect(isNumber(null)).toEqual(false)
    expect(isNumber(() => {})).toEqual(false)
  })
})
