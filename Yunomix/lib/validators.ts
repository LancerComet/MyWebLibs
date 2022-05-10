import { ConstructorOf } from '@lancercomet/types'
import { Rule, Validator, IRulesMetaData } from './types'
import { isNull, isNumber, isString, isUndefined } from './utils'

const VALIDATOR_RULES = 'yunomix:rules'

/**
 * A field that should neither be undefined or null or empty string.
 *
 * @param msg Error message.
 * @example
 * class User {
 *   @Required('Please provide a username.')
 *   username: string = ''
 * }
 */
export function Required (msg: string = 'This field is required.') {
  return CustomRule(
    v => (v !== '' && !isNull(v) && !isUndefined(v)) || msg
  )
}

/**
 * A field that should be a string.
 * @param {number} [min = 0] Min length.
 * @param {number} [max] Max length.
 * @param messages Define error messages.
 */
export function IsString (
  min: number = 0,
  max?: number,
  messages?: {
    invalidType?: string
    invalidLength?: string
  }
) {
  return CustomRule((v: string) => {
    if (!isString(v)) {
      return (messages?.invalidType ?? 'This field must be a string.')
    }
    const isIncorrectLength = v.length < min || (isNumber(max) && v.length > max)
    return isIncorrectLength
      ? (messages?.invalidLength ?? `Text length should between ${min} and ${max}.`)
      : true
  })
}

/**
 * Check whether text is an Email.
 *
 * @param {string} msg Error message.
 */
export function IsEmail (msg: string = 'This text should be an Email.') {
  return createRegExpTestRule(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, msg)
}

/**
 * Check whether target is a Chinese text.
 *
 * @param {string} msg Error message.
 */
export function IsChinese (msg: string = 'This text should be Chinese.') {
  return createRegExpTestRule(/^[\u0391-\uFFE5]+$/, msg)
}

/**
 * Check whether target is a English text.
 *
 * @param {string} msg Error message.
 */
export function IsEnglish (msg: string = 'This text should be English.') {
  return createRegExpTestRule(/^[a-zA-Z]+$/, msg)
}

/**
 * Check number type.
 *
 * @param msg Error message.
 */
export function IsNumber (msg: string = 'This text should be a number.') {
  return createRegExpTestRule(/^[0-9.]+$/, msg)
}

/**
 * Check number range.
 *
 * @param min Min value.
 * @param max Max value.
 * @param msg Error message.
 */
export function NumRange (min: number, max: number, msg?: string) {
  msg = msg || `The value should within ${min}~${max}.`
  return CustomRule(
    v => {
      const numV = parseFloat(v)
      return (!isNaN(numV) && numV >= min && numV <= max) || msg
    }
  )
}

/**
 * Check if target is an Http URL.
 *
 * @param msg Error message.
 */
export function IsHttpUrl (param?: {
  /**
   * If "//some-url.com" is allowed.
   * @default true
   */
  allowAutoProto?: boolean

  /**
   * Error message.
   */
  message?: string
}) {
  const allowAutoProto = param?.allowAutoProto ?? true
  const message = param?.message ?? 'Please provide a valid Http URL.'

  return allowAutoProto
    ? createRegExpTestRule(
      // eslint-disable-next-line no-useless-escape
      /^(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      message
    )
    : createRegExpTestRule(
      // eslint-disable-next-line no-useless-escape
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      message
    )
}

/**
 * Hex color format validation.
 */
export function IsHexColor (
  /**
   * Validation param.
   */
  params?: {
    /**
     * If hex abbr (#000) is allowed. Default: true.
     */
    allowAbbr?: boolean

    /**
     * If only upper case (#ABCDEF). Default: false.
     */
    onlyUpperCase?: boolean

    /**
     * Is ARGB format is allowed (#00ABCDEF). Default: false.
     */
    useARGB?: boolean
  },

  /**
   * Error message.
   */
  msg?: string
) {
  const allowAbbr = params?.allowAbbr ?? true
  const onlyUpperCase = params?.onlyUpperCase ?? false
  const useARGB = params?.useARGB === true

  let exampleColor = ''
  if (useARGB) {
    if (allowAbbr) {
      exampleColor = '#000, #12450d, #00ffaadd'
    } else {
      exampleColor = '#00ffaadd'
    }
  } else {
    if (allowAbbr) {
      exampleColor = '#000, #12450d'
    } else {
      exampleColor = '#12450d'
    }
  }

  if (onlyUpperCase) {
    exampleColor = exampleColor.toUpperCase()
  }

  const hintText = msg || `Please provide a valid hex color, like "${exampleColor}".`

  // Order:
  //  - Check hex format.
  //  - Check length.
  const fns: Rule[] = []

  if (onlyUpperCase) {
    fns.push(v => /^#[\dA-F]{0,8}$/.test(v) || hintText)
  } else {
    fns.push(v => /^#[\da-fA-F]{0,8}$/.test(v) || hintText)
  }

  if (allowAbbr) {
    if (useARGB) {
      fns.push(v => v.length === 4 || v.length === 7 || v.length === 9 || hintText)
    } else {
      fns.push(v => v.length === 4 || v.length === 7 || hintText)
    }
  } else {
    if (useARGB) {
      fns.push(v => v.length === 9 || hintText)
    } else {
      fns.push(v => v.length === 7 || hintText)
    }
  }
  return CustomRule(...fns)
}

/**
 * Create a custom validator.
 *
 * @param {Rule[]} fns Validating function.
 * @example
 * class User {
 *   @CustomRule(v => v === 'John Smith' || 'Username can only be "John Smith".')
 *   name: string = ''
 *
 *   @CustomRule(
 *     v => v > 0 || 'Age must be greator than 0.',
 *     v => v < 10 || 'Age must be less than 10.'
 *   )
 *   age: number = 0
 * }
 */
export function CustomRule (...fns: Rule[]) {
  return function (target: object, prototypeKey: string) {
    fns.forEach(fn => {
      setRulesMetaDataByKey(prototypeKey, fn, target)
    })
  }
}

/**
 * Execute validation manually.
 * For people who don't have Vuetify or Lancet.
 *
 * @param value Target value.
 * @param rules Validation rule functions.
 * @returns {true | string} A true will be returned if validating passed, otherwise a string will be returned.
 */
export function validate (value: unknown, rules: Rule[]): true | string {
  for (const rule of rules) {
    const reuslt = rule(value)
    if (typeof reuslt === 'string') {
      return reuslt
    }
  }
  return true
}

/**
 * Get validation rules.
 *
 * @template T
 * @param {ConstructorOf<T>} Constructor The decorated class.
 */
export function getValidatorRules<T> (Constructor: ConstructorOf<T>): Validator<T> {
  const rulesMetaData = Reflect.getMetadata(VALIDATOR_RULES, Constructor)
  return rulesMetaData
}

function createRegExpTestRule (regExp: RegExp, msg: string) {
  return CustomRule(v => regExp.test(v) || msg)
}

function setRulesMetaDataByKey (key: string, fn: Rule, target: object) {
  // target is the prototype object, not the constructor.
  const constructor = target.constructor
  let rulesMetaData: IRulesMetaData = {}
  if (Reflect.hasMetadata(VALIDATOR_RULES, constructor)) {
    rulesMetaData = Reflect.getMetadata(VALIDATOR_RULES, constructor)
  }
  if (Reflect.has(rulesMetaData, key)) {
    rulesMetaData[key] = [...rulesMetaData[key], fn]
  } else {
    rulesMetaData[key] = [fn]
  }
  Reflect.defineMetadata(VALIDATOR_RULES, rulesMetaData, constructor)
}
