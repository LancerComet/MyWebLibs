/* eslint-disable no-undef */

import { NumRange, getValidatorRules } from '../lib'

it('@NumRange should work.', () => {
  class User {
    @NumRange(1, 10)
    number: number = 0
  }

  const rules = getValidatorRules(User)
  expect(typeof rules.number[0](0)).toBe('string')
  expect(rules.number[0](1)).toBe(true)
  expect(rules.number[0](10)).toBe(true)
  expect(typeof rules.number[0](20)).toBe('string')
  expect(typeof rules.number[0]('abc')).toBe('string')
})
