/* eslint-disable no-undef */

import { Required, getValidatorRules } from '../lib'

it('@Required should work properly.', () => {
  class User {
    @Required('required')
    name: string = ''
  }
  const rules = getValidatorRules<User>(User)

  expect(rules.name[0]('')).toBe('required')
  expect(rules.name[0](undefined)).toBe('required')
  expect(rules.name[0](null)).toBe('required')
  expect(rules.name[0](0)).toBe(true)
  expect(rules.name[0](false)).toBe(true)
  expect(rules.name[0]('Kayne')).toBe(true)
})
