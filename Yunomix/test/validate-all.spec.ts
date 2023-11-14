/* eslint-disable no-undef */

import { Required } from '../lib'
import { validateAll } from '../lib/functions'

it('Nested rules should be supported', function () {
  class A {
    @Required('D_REQUIRED')
    d: string = ''
  }

  class B {
    a: A = new A()

    @Required('C_REQUIRED')
    c: string = ''
  }

  const test1 = () => {
    const b = new B()
    b.c = 'kayne'
    return validateAll(b)
  }

  const test2 = () => {
    const b = new B()
    b.a.d = 'kayne'
    return validateAll(b)
  }

  const test3 = () => {
    const b = new B()
    b.a.d = 'kayne.'
    b.c = 'kayne.'
    return validateAll(b)
  }

  const test4 = () => {
    const b = new B()
    return validateAll(b)
  }

  expect(test1()).toEqual(['D_REQUIRED'])
  expect(test2()).toEqual(['C_REQUIRED'])
  expect(test3()).toEqual([])
  expect(test4()).toEqual(['D_REQUIRED', 'C_REQUIRED'])
})
