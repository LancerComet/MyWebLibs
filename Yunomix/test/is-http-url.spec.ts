/* eslint-disable no-undef */

import { getValidatorRules, IsHttpUrl } from '../lib'

it('@IsHttpUrl testing.', () => {
  class User {
    @IsHttpUrl()
    avatar: string = ''

    @IsHttpUrl('must be an url')
    url: string = ''
  }

  const rules = getValidatorRules(User)
  expect(rules.avatar[0]('http://www.baidu.com')).toBe(true)
  expect(rules.avatar[0]('https://www.baidu.com')).toBe(true)
  expect(rules.avatar[0]('//www.baidu.com')).toBe('Please provide a valid Http URL.')
  expect(rules.avatar[0]('bilicomic://classify')).toBe('Please provide a valid Http URL.')
  expect(rules.url[0]('//www.baidu.com')).toBe('must be an url')
})
