import { addClass, hasClass, removeClass } from '../lib/element'

it('Element 测试.', () => {
  const div = document.createElement('div')

  expect(hasClass(div, 'is-actived')).toEqual(false)
  addClass(div, 'is-actived')
  expect(hasClass(div, 'is-actived')).toEqual(true)

  expect(hasClass(div, 'feels-good')).toEqual(false)
  addClass(div, 'feels-good')
  expect(hasClass(div, 'feels-good')).toEqual(true)

  removeClass(div, 'is-actived')
  expect(hasClass(div, 'is-actived')).toEqual(false)
  expect(hasClass(div, 'feels-good')).toEqual(true)

  removeClass(div, 'feels-good')
  expect(hasClass(div, 'is-actived')).toEqual(false)
  expect(hasClass(div, 'feels-good')).toEqual(false)

  addClass(div, 'finally')
  expect(hasClass(div, 'is-actived')).toEqual(false)
  expect(hasClass(div, 'feels-good')).toEqual(false)
  expect(hasClass(div, 'finally')).toEqual(true)

  removeClass(div, 'finally')
  expect(hasClass(div, 'is-actived')).toEqual(false)
  expect(hasClass(div, 'feels-good')).toEqual(false)
  expect(hasClass(div, 'finally')).toEqual(false)
})
