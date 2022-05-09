/* eslint-disable no-undef */

import { Required, MinLength, MaxLength, getValidatorRules } from '../lib'

it('@Required @MaxLength combine testing.', () => {
  class User {
    @Required('required')
    @MaxLength(10, 'less 10')
    name: string = ''

    @MinLength(5, 'greater 5')
    addr: string = ''
  }
  const rules = getValidatorRules<User>(User)

  expect(rules.name[0]('')).toBe('required')
  expect(rules.name[1]('kayne')).toBe(true)
  expect(rules.name[1]('kaynelalalalalalalalala')).toBe('less 10')
  expect(rules.addr[0]('')).toBe('greater 5')
  expect(rules.addr[0]('The mars and the heaven')).toBe(true)
})
