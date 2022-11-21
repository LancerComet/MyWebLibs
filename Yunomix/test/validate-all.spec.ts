/* eslint-disable no-undef */

import { Required } from '../lib'
import { validateAll } from '../lib/functions'

it('Nested rules should be supported', function () {
  class A {
    @Required('required')
    d: string = ''
  }

  class B {
    a: A = new A()

    @Required('required')
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

  expect(test1()).toBe('required')
  expect(test2()).toBe('required')
  expect(test3()).toBe(true)
})
