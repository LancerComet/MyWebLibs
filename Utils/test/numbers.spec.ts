import { intParse, floatParse, isFloat, isInt } from '../lib/numbers'

describe('Numbers 测试.', () => {
  it('intParse.', () => {
    expect(intParse(10)).toEqual(10)
    expect(intParse('10')).toEqual(10)
    expect(intParse('10a')).toEqual(10)
    expect(intParse('a10')).toEqual(undefined)
    expect(intParse(() => {}, 100)).toEqual(100)
  })

  it('floatParse 测试.', () => {
    expect(floatParse('10.1')).toBe(10.1)
    expect(floatParse('wow', 5.2)).toBe(5.2)
  })

  it('isInt.', () => {
    expect(isInt(1)).toBe(true)
    expect(isInt(1.0)).toBe(true)
    expect(isInt(1.1)).toBe(false)

    expect(isInt('1')).toBe(false)
    expect(isInt('1.0')).toBe(false)
    expect(isInt('1.1')).toBe(false)

    expect(isInt([])).toBe(false)
    expect(isInt({})).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt(undefined)).toBe(false)
    expect(isInt(() => {})).toBe(false)
  })

  it('isFloat.', () => {
    expect(isFloat(3.1)).toBe(true)
    expect(isFloat(3.0)).toBe(false)
    expect(isFloat(3)).toBe(false)

    expect(isFloat('3.1')).toBe(false)
    expect(isFloat('3.0')).toBe(false)
    expect(isFloat('3')).toBe(false)

    expect(isFloat([])).toBe(false)
    expect(isFloat({})).toBe(false)
    expect(isFloat(null)).toBe(false)
    expect(isFloat(undefined)).toBe(false)
    expect(isFloat(() => {})).toBe(false)
  })
})
