/* eslint-disable no-undef */

import { NumRange, getValidatorRules, validate } from '../lib'

it('@NumRange should work.', () => {
  class User {
    @NumRange(1, 10)
    number: number = 0
  }

  const rules = getValidatorRules(User)
  expect(validate(0, rules.number)).toBe('The value should within 1~10.')
  expect(validate(1, rules.number)).toBe(true)
  expect(validate(10, rules.number)).toBe(true)
  expect(validate(20, rules.number)).toBe('The value should within 1~10.')
  expect(validate('abc', rules.number)).toBe('The value should within 1~10.')
})
