/* eslint-disable no-undef */

import { getValidatorRules, IsChinese, validate } from '../lib'

it('@IsChinese testing.', () => {
  class User {
    @IsChinese('must be chinese')
    name: string
  }

  const rules = getValidatorRules(User)

  expect(validate('kayne', rules.name)).toBe('must be chinese')
  expect(validate('凯恩', rules.name)).toBe(true)
})
