// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string, defaultValue: any = '') => {
  if (!path || typeof obj !== 'object' || obj === null) {
    return defaultValue
  }

  const value = path.split('.').reduce((currentObj, key) => {
    if (currentObj && Object.prototype.hasOwnProperty.call(currentObj, key)) {
      return currentObj[key]
    }
    return undefined
  }, obj)

  return value !== undefined ? value : defaultValue
}

export {
  getNestedValue
}
