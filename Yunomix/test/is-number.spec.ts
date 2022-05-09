/* eslint-disable no-undef */

import { getValidatorRules, IsNumber } from '../lib'

it('@IsNumber testing.', () => {
  class User {
    @IsNumber('must number')
    name: string
  }
  const rules = getValidatorRules<User>(User)
  expect(rules.name[0]('abc')).toBe('must number')
  expect(rules.name[0](123)).toBe(true)
})
