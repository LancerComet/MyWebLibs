/* eslint-disable no-undef */

import { CustomRule, getValidatorRules } from '../lib'

it('@CustomRule testing.', () => {
  class User {
    @CustomRule(v => v === 'kayne' || 'you must be kayne!')
    name: string = ''

    @CustomRule(
      v => {
        console.log('vvv', v)
        return v > 0 || '> 0'
      },
      v => v < 10 || '< 10'
    )
    age: number = 0
  }

  const rules = getValidatorRules<User>(User)
  expect(rules.name[0]('LancerComet')).toBe('you must be kayne!')
  expect(rules.name[0]('kayne')).toBe(true)

  expect(rules.age[0](0)).toBe('> 0')
  expect(rules.age[0](10)).toBe(true)
  expect(rules.age[1](10)).toBe('< 10')
  expect(rules.age[1](0)).toBe(true)
})
