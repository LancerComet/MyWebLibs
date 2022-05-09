const isString = (target: any): target is string => {
  return typeof target === 'string'
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

export {
  isString,
  isNumber,
  isUndefined,
  isNull
}
