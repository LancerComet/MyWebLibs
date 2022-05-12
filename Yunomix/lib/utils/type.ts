const isString = (target: any): target is string => {
  return typeof target === 'string'
}

const isBoolean = (target: any): target is boolean => {
  return typeof target === 'boolean'
}

const isNumber = (target: any): target is number => {
  return typeof target === 'number'
}

const isUndefined = (target: any): target is undefined => {
  return typeof target === 'undefined'
}

const isNull = (target: any): target is null => {
  return target === null
}

const isFunction = (target: any): target is () => any => {
  return typeof target === 'function'
}

const isArray = (target: any): target is any[] => {
  return Object.prototype.toString.call(target) === '[object Array]'
}

export {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isNull,
  isString,
  isUndefined
}
