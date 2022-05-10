/* eslint-disable no-undef */

import { Required, getValidatorRules, validate, IsNumber } from '../lib'

it('Error message should work properly.', () => {
  let count = 0

  class User {
    @Required('Name is required.')
    name: string = ''

    @IsNumber(() => {
      count++
      return 'Count: ' + count
    })
    age: number = 0

    @Required()
    address: string = ''
  }

  const rules = getValidatorRules<User>(User)
  expect(validate('', rules.name)).toBe('Name is required.')
  expect(validate(false, rules.age)).toBe('Count: 1')
  expect(validate(false, rules.age)).toBe('Count: 2')
  expect(validate('', rules.address)).toBe('This field is required.')
})
