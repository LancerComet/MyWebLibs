/* eslint-disable no-undef */

import { IsString, getValidatorRules } from '../lib'

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

  expect(rules.text1[0]('Conceptors')).toBe(true)
  expect(rules.text1[0]('Conceptors.')).toBe('v <= 10')

  expect(rules.text2[0]('')).toBe('v >= 5')
  expect(rules.text2[0]('The mars and the heaven')).toBe(true)

  expect(rules.text3[0]('abcd')).toBe('5 <= v <= 10')
  expect(rules.text3[0]('abcde')).toBe(true)
  expect(rules.text3[0]('abcdefghij')).toBe(true)
  expect(rules.text3[0]('abcdefghijk')).toBe('5 <= v <= 10')
  expect(rules.text3[0](1)).toBe('invalid type')
})
