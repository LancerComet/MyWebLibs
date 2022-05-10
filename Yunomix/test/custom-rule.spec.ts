/* eslint-disable no-undef */

import { CustomRule, getValidatorRules, validate } from '../lib'

it('@CustomRule testing.', () => {
  class User {
    @CustomRule(v => v === 'Kayne' || 'You must be Kayne!')
    name: string = ''

    @CustomRule(
      v => v > 0 || '> 0',
      v => v < 10 || '< 10'
    )
    age: number = 0
  }

  const user = new User()
  const rules = getValidatorRules(User)

  expect(validate('LancerComet', rules.name)).toBe('You must be Kayne!')
  expect(validate('Kayne', rules.name)).toBe(true)

  expect(validate(0, rules.age)).toBe('> 0')
  expect(validate(5, rules.age)).toBe(true)
  expect(validate(10, rules.age)).toBe('< 10')
})
