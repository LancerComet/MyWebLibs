import * as qs from 'qs'

/**
 * 从 Url 中获取全部 QueryString.
 */
function getAllQueryStringValues (): qs.ParsedQs {
  return qs.parse(window.location.search.replace('?', ''))
}

/**
 * 从 Url 中获取目标查询字符串的值.
 *
 * @param {string} key
 */
function getTargetQueryStringValue (key: string): string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined {
  const queryStrings = getAllQueryStringValues()

  const matchedValues = Object
    .keys(queryStrings)
    .filter(item => item === key)
    .map(key => queryStrings[key])

  return matchedValues.length
    ? matchedValues[0]
    : undefined
}

/**
 * 将对象格式化为查询字符串.
 *
 * @export
 * @param {*} data
 * @param {qs.IStringifyOptions} option
 * @returns {string}
 */
function stringify (data: any, option?: qs.IStringifyOptions): string {
  return qs.stringify(data, option)
}

export {
  getTargetQueryStringValue,
  getAllQueryStringValues,
  stringify
}
