/* eslint-disable no-undef */

import { getValidatorRules, IsNumber, validate } from '../lib'

it('@IsNumber testing.', () => {
  class User {
    @IsNumber('must number')
    name: string
  }

  const rules = getValidatorRules<User>(User)
  expect(validate('abc', rules.name)).toBe('must number')
  expect(validate(null, rules.name)).toBe('must number')
  expect(validate(undefined, rules.name)).toBe('must number')
  expect(validate(123, rules.name)).toBe(true)
})
