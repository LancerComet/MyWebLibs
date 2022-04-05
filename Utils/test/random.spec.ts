import { randomInt, randomItem, randomString } from '../lib/random'

describe('Numbers 测试.', () => {
  it('randomInt.', () => {
    expect(typeof randomInt()).toBe('number')
    expect(randomInt().toString().length).toBe(1)
    expect(randomInt(100).toString().length).toBe(20)
  })

  it('randomString.', () => {
    expect(typeof randomString()).toBe('string')
    expect(randomString().length).toBe(14)
    expect(randomString(200).length).toBe(200)
  })

  it('randomItem.', () => {
    const array = [1, 2, 3, 4, 5]
    expect(array.indexOf(randomItem(array)) > -1).toBe(true)
  })
})
