import {
  getStringByteLength, getStringCharCount,
  toCamelCase, toKebabCase, toPascalCase
} from '../lib/strings'

describe('Strings 测试.', () => {
  it('getStringByteLength.', async () => {
    expect(getStringByteLength('')).toEqual(0)
    expect(getStringByteLength('1')).toEqual(1)
    expect(getStringByteLength('12')).toEqual(2)
    expect(getStringByteLength('测试字符')).toEqual(8)
    expect(getStringByteLength('十分 Naive')).toEqual(10)
  })

  it('getStringCharCount.', async () => {
    expect(getStringCharCount('')).toEqual(0)
    expect(getStringCharCount('1')).toEqual(1)
    expect(getStringCharCount('12')).toEqual(2)
    expect(getStringCharCount('测试字符')).toEqual(4)
    expect(getStringCharCount('十分 Naive')).toEqual(8)
    expect(getStringCharCount('🐸👩🏿')).toEqual(2)
    expect(getStringCharCount('👩🏿👩🏿👩🏿')).toEqual(3)
    expect(getStringCharCount('Emoji 👩🏿')).toEqual(7)
  })

  it('Case format testing.', () => {
    expect(toCamelCase('welcome-to-a-New-day')).toBe('welcomeToANewDay')
    expect(toCamelCase('welcometoanewday')).toBe('welcometoanewday')

    expect(toPascalCase('welcome-to-a-New-day')).toBe('WelcomeToANewDay')
    expect(toPascalCase('welcometoanewday')).toBe('Welcometoanewday')

    expect(toKebabCase('lancerCometWch')).toBe('lancer-comet-wch')
    expect(toKebabCase('LancerCometWch')).toBe('lancer-comet-wch')
    expect(toKebabCase('lancer-CometWch')).toBe('lancer-comet-wch')
    expect(toKebabCase('-lancer-comet-Wch-')).toBe('lancer-comet-wch')
  })
})
