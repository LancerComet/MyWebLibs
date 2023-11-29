/* eslint-disable no-undef */

import { Required, validateAll } from '../lib'

it('Nested rules should be supported', function () {
  class A {
    @Required('A_REQUIRED')
    a: string = ''
  }

  class B {
    a: A = new A()

    @Required('B_REQUIRED')
    b: string = ''

    c: number = 0
  }

  const test1 = () => {
    const b = new B()
    b.b = 'kayne'
    return validateAll(b)
  }

  const test2 = () => {
    const b = new B()
    b.a.a = 'kayne'
    return validateAll(b)
  }

  const test3 = () => {
    const b = new B()
    b.a.a = 'kayne.'
    b.b = 'kayne.'
    return validateAll(b)
  }

  const test4 = () => {
    const b = new B()
    return validateAll(b)
  }

  expect(test1()).toEqual(['A_REQUIRED'])
  expect(test2()).toEqual(['B_REQUIRED'])
  expect(test3()).toEqual([])
  expect(test4()).toEqual(['A_REQUIRED', 'B_REQUIRED'])
})
