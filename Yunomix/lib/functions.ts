import { ConstructorOf } from '@lancercomet/types'
import { Rule, Validator } from './types'
import { VALIDATOR_RULES } from './config'
import { isArray, isNull } from './utils/type'

interface IRulesMetaData {
  [key: string]: unknown[]
}

/**
 * Execute validation manually.
 * For people who don't have Vuetify or Lancet.
 *
 * @param value Target value.
 * @param rules Validation rule functions.
 * @returns {true | string} A true will be returned if validating passed, otherwise a string will be returned.
 */
function validate (value: unknown, rules: Rule[]): true | string {
  for (const rule of rules) {
    const result = rule(value)
    if (typeof result === 'string') {
      return result
    }
  }
  return true
}

/**
 * Execute all validation manually.
 * Note: This function will validate all rules what the target included.
 *
 * @param target Target class.
 * @return { true | string } Same as the validate function.
 * But the string will be included property, like: 'username: is required!'
 */
function validateAll <T> (target: T): true | string[] {
  const keys = Object.keys(target) as Array<keyof T>

  const result: string[] = []
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    const value = target[k]
    if (typeof value === 'object' && !isArray(value) && !isNull(value)) {
      const validateResult = validateAll(value)
      if (Array.isArray(validateResult)) {
        validateResult.forEach(item => {
          if (typeof item === 'string') {
            result.push(item)
          }
        })
      }
    } else {
      const rules = getValidatorRules(target.constructor as ConstructorOf<T>)
      const validateResult = validate(value, rules[k])
      if (typeof validateResult === 'string') {
        result.push(validateResult)
      }
    }
  }

  if (result.length) {
    return result
  }

  return true
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
 *     v => v > 0 || 'Age must be greater than 0.',
 *     v => v < 10 || 'Age must be less than 10.'
 *   )
 *   age: number = 0
 * }
 */
function CustomRule (...fns: Rule[]) {
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
 * @return Validator<T> A collection of validators.
 */
function getValidatorRules<T> (Constructor: ConstructorOf<T>): Validator<T> {
  return Reflect.getMetadata(VALIDATOR_RULES, Constructor)
}

export {
  validate,
  validateAll,
  CustomRule,
  getValidatorRules
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
