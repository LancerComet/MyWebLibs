import { ConstructorOf } from '@lancercomet/types'
import { Rule, Validator } from './types'
import { VALIDATOR_RULES } from './config'

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
    const reuslt = rule(value)
    if (typeof reuslt === 'string') {
      return reuslt
    }
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
