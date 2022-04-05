import { isNumber } from './types'

/**
 * 格式化函数内部执行方法.
 *
 * @param {number} threshold 计算边界.
 * @param {string} unitLabel 单位文字.
 * @param {number} value 原始数字.
 * @param {number} [fixing=1] 保留小数, 默认为 1.
 * @returns {string}
 *
 * @example
 * unitFormat(10000, '万', 20000, 1)  // '2.0 万'
 */
function unitFormat (threshold: number, unitLabel: string, value: number, fixing: number = 1): string {
  if (!isNumber(value)) {
    return ''
  }

  if (value < threshold) {
    return value.toString()
  }

  return `${(value / threshold).toFixed(fixing)} ${unitLabel}`
}

/**
 * 万格式化.
 *
 * @param {number} value
 * @param {number} [fixing=1]
 * @returns
 */
function tenThousand (value: number, fixing: number = 1) {
  return unitFormat(10000, '万', value, fixing)
}

/**
 * 亿格式化.
 *
 * @param {number} value
 * @param {number} [fixing=1]
 * @returns
 */
function hundredMillion (value: number, fixing: number = 1) {
  return unitFormat(100000000, '亿', value, fixing)
}

export {
  unitFormat,
  tenThousand,
  hundredMillion
}
