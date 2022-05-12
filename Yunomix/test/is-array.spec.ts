/* eslint-disable no-undef */

import { getValidatorRules, IsArray, validate } from '../lib'

describe('@IsArray testing.', () => {
  it('@IsArray should work properly.', () => {
    class User {
      @IsArray()
      isArray: string[] = []

      @IsArray({
        minLength: 5
      })
      minLength: string[] = []

      @IsArray({
        maxLength: 5
      })
      maxLength: string[] = []

      @IsArray({
        minLength: 5,
        maxLength: 10
      })
      combineLength: string[] = []
    }

    const rules = getValidatorRules<User>(User)

    expect(validate('', rules.isArray)).toBe('This field should be an array.')
    expect(validate(undefined, rules.isArray)).toBe('This field should be an array.')
    expect(validate(null, rules.isArray)).toBe('This field should be an array.')
    expect(validate(1, rules.isArray)).toBe('This field should be an array.')
    expect(validate(() => 1, rules.isArray)).toBe('This field should be an array.')
    expect(validate({}, rules.isArray)).toBe('This field should be an array.')
    expect(validate([], rules.isArray)).toBe(true)

    expect(validate('', rules.maxLength)).toBe('This field should be an array.')
    expect(validate([], rules.minLength)).toBe('The count of members must be greater than 5.')
    expect(validate(new Array(5).fill(''), rules.minLength)).toBe(true)
    expect(validate(new Array(6).fill(''), rules.minLength)).toBe(true)

    expect(validate('', rules.maxLength)).toBe('This field should be an array.')
    expect(validate([], rules.maxLength)).toBe(true)
    expect(validate(new Array(5).fill(''), rules.maxLength)).toBe(true)
    expect(validate(new Array(6).fill(''), rules.maxLength)).toBe('The length should between 0 - 5.')

    expect(validate('', rules.combineLength)).toBe('This field should be an array.')
    expect(validate(new Array(4).fill(''), rules.combineLength)).toBe('The length should between 5 - 10.')
    expect(validate(new Array(5).fill(''), rules.combineLength)).toBe(true)
    expect(validate(new Array(10).fill(''), rules.combineLength)).toBe(true)
    expect(validate(new Array(11).fill(''), rules.combineLength)).toBe('The length should between 5 - 10.')
  })

  it('@IsArray should work properly with custom messages.', () => {
    class User {
      @IsArray({
        msg: {
          incorrectType: 'incorrect type'
        }
      })
      isArray: string[] = []

      @IsArray({
        minLength: 5,
        msg: {
          incorrectType: 'incorrect type',
          incorrectLength: '>= 5'
        }
      })
      minLength: string[] = []

      @IsArray({
        maxLength: 5,
        msg: {
          incorrectType: 'incorrect type',
          incorrectLength: '<= 5'
        }
      })
      maxLength: string[] = []

      @IsArray({
        minLength: 5,
        maxLength: 10,
        msg: {
          incorrectType: 'incorrect type',
          incorrectLength: '>= 5 && <= 10'
        }
      })
      combineLength: string[] = []
    }

    const rules = getValidatorRules<User>(User)

    expect(validate('', rules.isArray)).toBe('incorrect type')
    expect(validate(undefined, rules.isArray)).toBe('incorrect type')
    expect(validate(null, rules.isArray)).toBe('incorrect type')
    expect(validate(1, rules.isArray)).toBe('incorrect type')
    expect(validate(() => 1, rules.isArray)).toBe('incorrect type')
    expect(validate({}, rules.isArray)).toBe('incorrect type')
    expect(validate([], rules.isArray)).toBe(true)
    expect(validate([1, 2, 3], rules.isArray)).toBe(true)

    expect(validate('', rules.minLength)).toBe('incorrect type')
    expect(validate([], rules.minLength)).toBe('>= 5')
    expect(validate(new Array(5).fill(''), rules.minLength)).toBe(true)
    expect(validate(new Array(6).fill(''), rules.minLength)).toBe(true)

    expect(validate('', rules.maxLength)).toBe('incorrect type')
    expect(validate([], rules.maxLength)).toBe(true)
    expect(validate(new Array(5).fill(''), rules.maxLength)).toBe(true)
    expect(validate(new Array(6).fill(''), rules.maxLength)).toBe('<= 5')

    expect(validate('', rules.combineLength)).toBe('incorrect type')
    expect(validate(new Array(4).fill(''), rules.combineLength)).toBe('>= 5 && <= 10')
    expect(validate(new Array(5).fill(''), rules.combineLength)).toBe(true)
    expect(validate(new Array(10).fill(''), rules.combineLength)).toBe(true)
    expect(validate(new Array(11).fill(''), rules.combineLength)).toBe('>= 5 && <= 10')
  })
})
