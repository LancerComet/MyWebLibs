/* eslint-disable no-undef */

import { getValidatorRules, IsEnglish } from '../lib'

it('@IsEnglish testing.', () => {
  class User {
    @IsEnglish('must english')
    name: string
  }
  const rules = getValidatorRules<User>(User)
  expect(rules.name[0]('凯恩')).toBe('must english')
  expect(rules.name[0]('kayne')).toBe(true)
})
