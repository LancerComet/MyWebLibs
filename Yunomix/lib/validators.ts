import { ErrorMessage, MessageFactory, Rule } from './types'
import { isArray, isFunction, isNull, isNumber, isString, isUndefined, isBoolean } from './utils/type'
import { CustomRule } from './functions'

const createErrorMsgFactory = (defaultMessage: string, userMessage?: ErrorMessage): MessageFactory => {
  return () => {
    if (!userMessage) {
      return defaultMessage
    }
    return isFunction(userMessage) ? userMessage() : userMessage
  }
}

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
function Required (msg?: ErrorMessage) {
  const message = createErrorMsgFactory('This field is required.', msg)
  return CustomRule(
    v => (v !== '' && !isNull(v) && !isUndefined(v)) || message()
  )
}

/**
 * Indicate this field should be a boolean.
 *
 * @param msg Error message.
 */
function IsBoolean (msg?: string) {
  const message = createErrorMsgFactory('This field should be either a true or false.', msg)
  return CustomRule(
    v => isBoolean(v) || message()
  )
}

/**
 * A field that should be a string.
 *
 * @param {number} [min = 0] Min length.
 * @param {number} [max] Max length.
 * @param msg Define error messages.
 *
 * @example
 * class User {
 *   @IsString()
 *   name: string = ''
 * }
 */
function IsString (
  min: number = 0,
  max?: number,
  msg?: {
    invalidType?: ErrorMessage
    invalidLength?: ErrorMessage
  }
) {
  const invalidTypeMsg = createErrorMsgFactory('This field must be a string.', msg?.invalidType)
  const invalidLengthMsg = createErrorMsgFactory(`Text length should between ${min} and ${max}.`, msg?.invalidLength)
  return CustomRule((v: unknown) => {
    if (!isString(v)) {
      return invalidTypeMsg()
    }
    const isIncorrectLength = v.length < min || (isNumber(max) && v.length > max)
    return isIncorrectLength ? invalidLengthMsg() : true
  })
}

const EMAIL_REGEXP = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/**
 * Check whether text is an Email.
 *
 * @param {ErrorMessage} [msg] Error message.
 */
function IsEmail (msg?: ErrorMessage) {
  const message = createErrorMsgFactory('This text should be an Email.', msg)
  return CustomRule(v => EMAIL_REGEXP.test(v) || message())
}

const CHINESE_REGEXP = /^[\u0391-\uFFE5]+$/

/**
 * Check whether target is a Chinese text.
 *
 * @param {ErrorMessage} [msg] Error message.
 */
function IsChinese (msg?: ErrorMessage) {
  const message = createErrorMsgFactory('This text should be Chinese.', msg)
  return CustomRule(v => CHINESE_REGEXP.test(v) || message())
}

const ENGLISH_REGEXP = /^[a-zA-Z]+$/

/**
 * Check whether target is a English text.
 *
 * @param {ErrorMessage} [msg] Error message.
 */
function IsEnglish (msg?: ErrorMessage) {
  const message = createErrorMsgFactory('This text should be English.', msg)
  return CustomRule(v => ENGLISH_REGEXP.test(v) || message())
}

const NUM_REGEXP = /^[0-9.]+$/

/**
 * Check number type.
 *
 * @param msg Error message.
 */
function IsNumber (msg?: ErrorMessage) {
  const message = createErrorMsgFactory('This text should be a number.', msg)
  return CustomRule(v => NUM_REGEXP.test(v) || message())
}

/**
 * Check number range.
 *
 * @param min Min value.
 * @param max Max value.
 * @param [msg] Error message.
 */
function NumRange (min: number, max: number, msg?: ErrorMessage) {
  const message = createErrorMsgFactory(`The value should within ${min}~${max}.`, msg)
  return CustomRule(
    v => {
      const numV = parseFloat(v)
      return (!isNaN(numV) && numV >= min && numV <= max) || message()
    }
  )
}

const HTTP_URL_REGEXP_1 = /^(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/
const HTTP_URL_REGEXP_2 = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/

/**
 * Check if target is a Http URL.
 *
 * @param param Configuration.
 */
function IsHttpUrl (param?: {
  /**
   * If "//some-url.com" is allowed.
   *
   * @default true
   */
  allowAutoProto?: boolean

  /**
   * Error message.
   *
   * @default 'Please provide a valid Http URL.'
   */
  msg?: ErrorMessage
}) {
  const message = createErrorMsgFactory('Please provide a valid Http URL.', param?.msg)
  const allowAutoProto = param?.allowAutoProto ?? true
  return allowAutoProto
    ? CustomRule(v => HTTP_URL_REGEXP_1.test(v) || message())
    : CustomRule(v => HTTP_URL_REGEXP_2.test(v) || message())
}

/**
 * Hex color format validation.
 */
function IsHexColor (params?: {
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

  /**
   * Error message.
   */
  msg?: ErrorMessage
}) {
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

  const message = createErrorMsgFactory(`Please provide a valid hex color, like "${exampleColor}".`, params?.msg)

  // Order:
  //  - Check hex format.
  //  - Check length.
  const fns: Rule[] = []

  if (onlyUpperCase) {
    fns.push(v => /^#[\dA-F]{0,8}$/.test(v) || message())
  } else {
    fns.push(v => /^#[\da-fA-F]{0,8}$/.test(v) || message())
  }

  if (allowAbbr) {
    if (useARGB) {
      fns.push(v => v.length === 4 || v.length === 7 || v.length === 9 || message())
    } else {
      fns.push(v => v.length === 4 || v.length === 7 || message())
    }
  } else {
    if (useARGB) {
      fns.push(v => v.length === 9 || message())
    } else {
      fns.push(v => v.length === 7 || message())
    }
  }

  return CustomRule(...fns)
}

/**
 * Indicate that target should be an array.
 *
 * @param param Validation config.
 */
function IsArray (param?: {
  minLength?: number
  maxLength?: number
  msg?: {
    incorrectType?: ErrorMessage
    incorrectLength?: ErrorMessage
  }
}) {
  const minLength = param?.minLength ?? 0
  const maxLength = param?.maxLength
  const incorrectType = createErrorMsgFactory('This field should be an array.', param?.msg?.incorrectType)
  const incorrectLength = createErrorMsgFactory(
    isNumber(maxLength)
      ? `The length should between ${minLength} - ${maxLength}.`
      : `The count of members must be greater than ${minLength}.`,
    param?.msg?.incorrectLength
  )
  return CustomRule(
    v => isArray(v) || incorrectType(),
    v => v.length >= minLength || incorrectLength(),
    v => (isNumber(maxLength) ? v.length <= maxLength : true) || incorrectLength()
  )
}

/**
 * Indicate the field should matches the provided values.
 */
function MatchValue (param: {
  /**
   * Values that user input should match.
   *
   * @type {any[]}
   */
  values: any[]

  /**
   * Error message.
   */
  msg?: string
}) {
  const values = isArray(param.values) ? param.values : []
  const defaultMsg = `Please provide one of these value: "${values.join(', ')}".`
  const message = createErrorMsgFactory(defaultMsg, param.msg)
  return CustomRule(
    v => values.indexOf(v) > -1 || message()
  )
}

export {
  createErrorMsgFactory,
  IsArray,
  IsBoolean,
  IsChinese,
  IsEmail,
  IsEnglish,
  IsHexColor,
  IsHttpUrl,
  IsNumber,
  IsString,
  MatchValue,
  NumRange,
  Required
}
