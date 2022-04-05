import {
  getScrollTop, checkIsReachBottom,
  checkIsReachTop, scrollYWithAnimation
} from '../lib/scroll'

describe('Scroll 测试.', () => {
  it('getScrollTop.', () => {
    expect(getScrollTop()).toEqual(0)
  })

  it('scrollYWithAnimation', () => {
    scrollYWithAnimation()
  })

  it('checkIsReachTop', () => {
    const element = document.createElement('div')
    expect(checkIsReachTop(element)).toBe(true)
  })

  it('checkIsReachBottom', () => {
    const element = document.createElement('div')
    expect(checkIsReachBottom(element)).toBe(true)
  })
})
