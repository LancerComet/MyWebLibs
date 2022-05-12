/* eslint-disable no-undef */
import { getValidatorRules, validate } from '../lib'
import { MatchValue } from '../lib/validators'

it('@MatchValue should work properly.', () => {
  enum Username {
    John = 'John',
    Tom = 'Tom',
    Jack = 'Jack'
  }

  const values = [Username.Jack, Username.John, Username.Tom]
  const errorMsg = `Please provide one of these value: "${values.join(', ')}".`

  class User {
    @MatchValue({
      values
    })
    name: string = ''

    @MatchValue({
      values,
      msg: 'incorrect'
    })
    name2: string = ''
  }

  const rules = getValidatorRules(User)

  expect(validate(Username.Jack, rules.name)).toBe(true)
  expect(validate(Username.Jack, rules.name)).toBe(true)
  expect(validate(Username.Tom, rules.name)).toBe(true)
  expect(validate('', rules.name)).toBe(errorMsg)
  expect(validate(0, rules.name)).toBe(errorMsg)
  expect(validate(null, rules.name)).toBe(errorMsg)
  expect(validate(undefined, rules.name)).toBe(errorMsg)

  expect(validate(Username.Jack, rules.name2)).toBe(true)
  expect(validate(Username.Jack, rules.name2)).toBe(true)
  expect(validate(Username.Tom, rules.name2)).toBe(true)
  expect(validate('', rules.name2)).toBe('incorrect')
  expect(validate(0, rules.name2)).toBe('incorrect')
  expect(validate(null, rules.name2)).toBe('incorrect')
  expect(validate(undefined, rules.name2)).toBe('incorrect')
})
