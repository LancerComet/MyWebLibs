/* eslint-disable no-undef */

import { getValidatorRules, IsHttpUrl, validate } from '../lib'

it('@IsHttpUrl testing.', () => {
  class User {
    @IsHttpUrl()
    avatar: string = ''

    @IsHttpUrl({
      allowAutoProto: false,
      msg: 'must be an url'
    })
    url: string = ''
  }

  const rules = getValidatorRules(User)

  expect(validate('http://www.baidu.com', rules.avatar)).toBe(true)
  expect(validate('https://www.baidu.com', rules.avatar)).toBe(true)
  expect(validate('//www.baidu.com', rules.avatar)).toBe(true)
  expect(validate('bilicomic://classify', rules.avatar)).toBe('Please provide a valid Http URL.')

  expect(validate('//www.baidu.com', rules.url)).toBe('must be an url')
})
