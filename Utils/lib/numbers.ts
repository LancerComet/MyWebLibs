/**
 * 安全将字符串转换为数字.
 *
 * @param {string} target 目标字符串.
 * @param {*} [fallback] 降级数值.
 */
function intParse (target: unknown, fallback?: any): number {
  const number = parseInt(target as string, 10)
  return isNaN(number)
    ? fallback
    : number
}

/**
 * 安全将字符串转换为数字.
 *
 * @param {string} target 目标字符串.
 * @param {*} [fallback] 降级数值.
 */
function floatParse (target: unknown, fallback?: any): number {
  const number = parseFloat(target as string)
  return isNaN(number)
    ? fallback
    : number
}

/**
 * 检测是否为浮点数.
 * 方法没有字符串弱类型转换，请自行处理.
 *
 * @param {*} target 检测目标.
 * @returns {boolean}
 */
function isFloat (target: any): boolean {
  return Number(target) === target && target % 1 !== 0
}

/**
 * 检测是否为整数.
 * 方法没有字符串弱类型转换，请自行处理.
 *
 * @param {*} target 检测目标.
 * @returns {boolean}
 */
function isInt (target: any): boolean {
  return Number(target) === target && target % 1 === 0
}

export {
  intParse,
  floatParse,
  isInt,
  isFloat
}
