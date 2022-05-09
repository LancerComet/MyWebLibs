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
export function IsHttpUrl (msg: string = 'Please provide a valid Http URL.') {
  return createRegExpTestRule(
    // eslint-disable-next-line no-useless-escape
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    msg
  )
}

/**
 * Hex color format validation.
 *
 * @param {boolean} [allowAbbr=true] If hex abbr (#000) is allowed. Default: true.
 * @param {boolean} [onlyUpperCase=true] If only upper case (#ABCDEF). Default: false.
 * @param {boolean} [useARGB=false] Is ARGB format is allowed (#00ABCDEF). Default: false.
 * @param {string} msg Error message.
 */
export function IsHexColor (params?: {
  allowAbbr?: boolean
  onlyUpperCase?: boolean
  useARGB?: boolean
}, msg?: string) {
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
  return CustomRules(fns)
}

/**
 * Create a custom validator.
 *
 * @param fn Validating function.
 * @example
 * class User {
 *   @CustomRule(v => v === 'John Smith' || 'Username can only be "John Smith".')
 *   name: string = ''
 * }
 */
export function CustomRule (fn: Rule) {
  return function (target: object, prototypeKey: string) {
    setRulesMetaDataByKey(prototypeKey, fn, target)
  }
}

/**
 * Create custom validators.
 *
 * @param fns Validating functions.
 * @example
 * class User {
 *   @CustomRules([
 *     v => typeof v === 'string' || 'Username must be a string.',
 *     v => v !== 'John Smith' || 'Username cannot be "John Smith".',
 *     v => v.length > 1 || 'Username at least 1 character.'
 *   ])
 *   name: string = ''
 * }
 */
export function CustomRules (fns: Rule[]) {
  return function (target: object, prototypeKey: string) {
    fns.forEach(fn => {
      setRulesMetaDataByKey(prototypeKey, fn, target)
    })
  }
}

/**
 * Get validation rules.
 *
 * @template T
 * @param {ConstructorOf<T>} Constructor The decorated class.
 */
export function getValidatorRules<T> (Constructor: ConstructorOf<T>): Validator<T> {
  // @ts-ignore
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
  // @ts-ignore
  if (Reflect.hasMetadata(VALIDATOR_RULES, constructor)) {
    // @ts-ignore
    rulesMetaData = Reflect.getMetadata(VALIDATOR_RULES, constructor)
  }
  // @ts-ignore
  if (Reflect.has(rulesMetaData, key)) {
    rulesMetaData[key] = [fn, ...rulesMetaData[key]]
  } else {
    rulesMetaData[key] = [fn]
  }
  // @ts-ignore
  Reflect.defineMetadata(VALIDATOR_RULES, rulesMetaData, constructor)
}
