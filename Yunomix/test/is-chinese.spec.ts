/* eslint-disable no-undef */

import { getValidatorRules, IsChinese } from '../lib'

it('@IsChinese testing.', () => {
  class User {
    @IsChinese('must chinese')
    name: string
  }
  const rules = getValidatorRules<User>(User)
  expect(rules.name[0]('kayne')).toBe('must chinese')
  expect(rules.name[0]('凯恩')).toBe(true)
})
