import * as qs from 'qs'
import { isString } from './types'

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

/**
 * 从 URL 中移除所有查询字符串.
 *
 * @param {string} url
 * @returns {string}
 */
function removeAllQueriesFromUrl (url: string): string {
  if (!isString(url)) {
    return url
  }

  const queryIndex = url.indexOf('?')
  if (queryIndex > -1) {
    url = url.substring(0, queryIndex)
  }
  return url
}

export {
  getTargetQueryStringValue,
  getAllQueryStringValues,
  stringify,
  removeAllQueriesFromUrl
}
