import { hasCookie, getCookie, removeCookie, setCookie } from '../lib/cookies'

it('Cookies 测试.', () => {
  // Add name.
  expect(hasCookie('name')).toEqual(false)
  expect(setCookie('name', 'LC')).toEqual(true)
  expect(hasCookie('name')).toEqual(true)
  expect(getCookie('name')).toEqual('LC')
  expect(setCookie('name', 'LancerComet')).toEqual(true)
  expect(getCookie('name')).toEqual('LancerComet')

  // Add age.
  expect(hasCookie('age')).toEqual(false)
  expect(setCookie('age', '28')).toEqual(true)
  expect(hasCookie('age')).toEqual(true)
  expect(getCookie('age')).toEqual('28')

  // Read theme again.
  expect(getCookie('name')).toEqual('LancerComet')
  expect(getCookie('age')).toEqual('28')
  expect(hasCookie('name')).toEqual(true)
  expect(hasCookie('age')).toEqual(true)

  // Remove.
  expect(removeCookie('name')).toEqual(true)
  expect(removeCookie('age')).toEqual(true)
  expect(removeCookie('name')).toEqual(false)
  expect(removeCookie('age')).toEqual(false)

  // Check whether removing is succeed.
  expect(getCookie('name')).toEqual('')
  expect(getCookie('age')).toEqual('')
  expect(hasCookie('name')).toEqual(false)
  expect(hasCookie('age')).toEqual(false)

  // Can't set invalid cookie.
  ;['expires', 'max-age', 'path', 'domain', 'secure'].forEach(key => {
    expect(setCookie(key, 'some-value')).toEqual(false)
    expect(getCookie(key)).toEqual('')
  })
})
