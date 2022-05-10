/* eslint-disable no-undef */

import { getValidatorRules, IsHexColor, validate } from '../lib'

describe('Validator testing.', () => {
  it('@IsHexColor testing.', () => {
    class Color {
      @IsHexColor()
      defaultRule: string

      @IsHexColor({
        onlyUpperCase: true
      })
      rule1: string

      @IsHexColor({
        useARGB: true
      })
      rule2: string
    }

    const rules = getValidatorRules(Color)

    expect(validate('123', rules.defaultRule)).toBe('Please provide a valid hex color, like "#000, #12450d".')
    expect(validate('#ccc', rules.defaultRule)).toBe(true)
    expect(validate('#CCC', rules.defaultRule)).toBe(true)
    expect(validate('#CCCCCC', rules.defaultRule)).toBe(true)
    expect(validate('#00CCCCCC', rules.defaultRule)).toBe('Please provide a valid hex color, like "#000, #12450d".')

    expect(validate('123', rules.rule1)).toBe('Please provide a valid hex color, like "#000, #12450D".')
    expect(validate('#ccc', rules.rule1)).toBe('Please provide a valid hex color, like "#000, #12450D".')
    expect(validate('#CCC', rules.rule1)).toBe(true)
    expect(validate('#4fc315', rules.rule1)).toBe('Please provide a valid hex color, like "#000, #12450D".')
    expect(validate('#4FC315', rules.rule1)).toBe(true)
    expect(validate('#aa4fc315', rules.rule1)).toBe('Please provide a valid hex color, like "#000, #12450D".')
    expect(validate('#AA4FC315', rules.rule1)).toBe('Please provide a valid hex color, like "#000, #12450D".')

    expect(validate('123', rules.rule2)).toBe('Please provide a valid hex color, like "#000, #12450d, #00ffaadd".')
    expect(validate('#ccc', rules.rule2)).toBe(true)
    expect(validate('#4fc315', rules.rule2)).toBe(true)
    expect(validate('#4FC315', rules.rule2)).toBe(true)
    expect(validate('#aa4fc315', rules.rule2)).toBe(true)
    expect(validate('#AA4FC315', rules.rule2)).toBe(true)
  })
})
