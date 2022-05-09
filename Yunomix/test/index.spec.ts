/* eslint-disable no-undef */
import type { Rule } from '../lib'
import {
  Required,
  MinLength,
  MaxLength,
  getValidatorRules,
  IsChinese,
  IsEnglish,
  IsNumber,
  CustomRule,
  IsHttpUrl,
  IsHexColor
} from '../lib'

describe('Validator testing.', () => {
  it('@Required @MaxLength combine testing.', () => {
    class User {
      @Required('required')
      @MaxLength(10, 'less 10')
      name: string = ''

      @MinLength(5, 'greater 5')
      addr: string = ''
    }
    const rules = getValidatorRules<User>(User)

    expect(rules.name[0]('')).toBe('required')
    expect(rules.name[1]('kayne')).toBe(true)
    expect(rules.name[1]('kaynelalalalalalalalala')).toBe('less 10')
    expect(rules.addr[0]('')).toBe('greater 5')
    expect(rules.addr[0]('The mars and the heaven')).toBe(true)
  })

  it('@IsChinese testing.', () => {
    class User {
      @IsChinese('must chinese')
      name: string
    }
    const rules = getValidatorRules<User>(User)
    expect(rules.name[0]('kayne')).toBe('must chinese')
    expect(rules.name[0]('凯恩')).toBe(true)
  })

  it('@IsEnglish testing.', () => {
    class User {
      @IsEnglish('must english')
      name: string
    }
    const rules = getValidatorRules<User>(User)
    expect(rules.name[0]('凯恩')).toBe('must english')
    expect(rules.name[0]('kayne')).toBe(true)
  })

  it('@IsNumber testing.', () => {
    class User {
      @IsNumber('must number')
      name: string
    }
    const rules = getValidatorRules<User>(User)
    expect(rules.name[0]('abc')).toBe('must number')
    expect(rules.name[0](123)).toBe(true)
  })

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

  it('@IsHexColor testing.', () => {
    class Color {
      @IsHexColor()
      rule1: string

      @IsHexColor({
        onlyUpperCase: true
      })
      rule2: string
    }
    const rules = getValidatorRules(Color)
    expect(rules.rule1[1]('123')).toBe('Please provide a valid hex color, like "#000, #12450d".')
    expect(rules.rule1[1]('#ccc')).toBe(true)
    expect(rules.rule1[1]('#CCC')).toBe(true)

    expect(rules.rule2[1]('#CCC')).toBe(true)
    expect(rules.rule2[1]('#ccc')).toBe('Please provide a valid hex color, like "#000, #12450D".')
  })
})
