/* eslint-disable no-undef */

import { CustomRule, getValidatorRules, Rule } from '../lib'

it('@CustomRule testing.', () => {
  const customFn: Rule = v => v === 'kayne' || 'you must be kayne!'
  class User {
    @CustomRule(customFn)
    name: string
  }
  const rules = getValidatorRules<User>(User)
  expect(rules.name[0]('LancerComet')).toBe('you must be kayne!')
  expect(rules.name[0]('kayne')).toBe(true)
})
