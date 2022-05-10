/* eslint-disable no-undef */

import { Required, getValidatorRules, validate } from '../lib'

it('@Required should work properly.', () => {
  class User {
    @Required('required')
    name: string = ''
  }
  const rules = getValidatorRules<User>(User)

  expect(validate('', rules.name)).toBe('required')
  expect(validate(undefined, rules.name)).toBe('required')
  expect(validate(null, rules.name)).toBe('required')
  expect(validate(0, rules.name)).toBe(true)
  expect(validate(false, rules.name)).toBe(true)
  expect(validate('Kayne', rules.name)).toBe(true)
})
