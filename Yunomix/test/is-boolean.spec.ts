/* eslint-disable no-undef */

import { getValidatorRules, IsBoolean, validate } from '../lib'

it('@IsBoolean shoud work properly.', () => {
  class User {
    @IsBoolean()
    isChecked: boolean = false

    @IsBoolean('incorrect')
    isChecked2: boolean = false
  }

  const rules = getValidatorRules(User)
  const defaultErrorMsg = 'This field should be either a true or false.'
  expect(validate(true, rules.isChecked)).toBe(true)
  expect(validate(false, rules.isChecked)).toBe(true)
  expect(validate('', rules.isChecked)).toBe(defaultErrorMsg)
  expect(validate(undefined, rules.isChecked)).toBe(defaultErrorMsg)
  expect(validate(null, rules.isChecked)).toBe(defaultErrorMsg)
  expect(validate(() => 1, rules.isChecked)).toBe(defaultErrorMsg)
  expect(validate([], rules.isChecked)).toBe(defaultErrorMsg)
  expect(validate(1, rules.isChecked)).toBe(defaultErrorMsg)

  expect(validate(true, rules.isChecked2)).toBe(true)
  expect(validate(false, rules.isChecked2)).toBe(true)
  expect(validate('', rules.isChecked2)).toBe('incorrect')
  expect(validate(undefined, rules.isChecked2)).toBe('incorrect')
  expect(validate(null, rules.isChecked2)).toBe('incorrect')
  expect(validate(() => 1, rules.isChecked2)).toBe('incorrect')
  expect(validate([], rules.isChecked2)).toBe('incorrect')
  expect(validate(1, rules.isChecked2)).toBe('incorrect')
})
