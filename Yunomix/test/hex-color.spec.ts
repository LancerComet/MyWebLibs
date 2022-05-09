/* eslint-disable no-undef */

import { getValidatorRules, IsHexColor } from '../lib'

describe('Validator testing.', () => {
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
    expect(rules.rule1[0]('123')).toBe('Please provide a valid hex color, like "#000, #12450d".')
    expect(rules.rule1[0]('#ccc')).toBe(true)
    expect(rules.rule1[0]('#CCC')).toBe(true)

    expect(rules.rule2[0]('#CCC')).toBe(true)
    expect(rules.rule2[0]('#ccc')).toBe('Please provide a valid hex color, like "#000, #12450D".')
  })
})
