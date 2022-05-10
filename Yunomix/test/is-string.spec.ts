/* eslint-disable no-undef */

import { IsString, getValidatorRules, validate } from '../lib'

it('@IsString should work properly.', () => {
  class User {
    @IsString(0, 10, {
      invalidLength: 'v <= 10'
    })
    text1: string = ''

    @IsString(5, undefined, {
      invalidLength: 'v >= 5'
    })
    text2: string = ''

    @IsString(5, 10, {
      invalidLength: '5 <= v <= 10',
      invalidType: 'invalid type'
    })
    text3: string = ''
  }
  const rules = getValidatorRules<User>(User)

  expect(validate('Conceptor.', rules.text1)).toBe(true)
  expect(validate('Conceptor..', rules.text1)).toBe('v <= 10')

  expect(validate('', rules.text2)).toBe('v >= 5')
  expect(validate('The mars and the heaven', rules.text2)).toBe(true)

  expect(validate('abcd', rules.text3)).toBe('5 <= v <= 10')
  expect(validate('abcde', rules.text3)).toBe(true)
  expect(validate('abcdefghij', rules.text3)).toBe(true)
  expect(validate('abcdefghijk', rules.text3)).toBe('5 <= v <= 10')
  expect(validate(1, rules.text3)).toBe('invalid type')
})
