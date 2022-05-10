/* eslint-disable no-undef */

import { getValidatorRules, IsEnglish, validate } from '../lib'

it('@IsEnglish testing.', () => {
  class User {
    @IsEnglish('must be english')
    name: string
  }
  const rules = getValidatorRules<User>(User)

  expect(validate('凯恩', rules.name)).toBe('must be english')
  expect(validate('kayne', rules.name)).toBe(true)
})
