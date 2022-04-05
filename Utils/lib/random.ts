/**
 * 生成随机整数.
 *
 * @param {number} [length=1] 整数长度, 最大 20.
 * @returns {number}
 */
function randomInt (length: number = 1): number {
  if (length > 20) {
    length = 20
  }

  let random = Math.random()
  if (random < 0.1) {
    random += 0.1
  }

  return Math.floor(random * Math.pow(10, length))
}

/**
 * 从数组中随机取出一个成员.
 *
 * @export
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
function randomItem<T> (array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * 生成随机字符串.
 *
 * @param {number} [length=14] 字符串长度.
 * @returns {string}
 */
function randomString (length = 14): string {
  const ROUND_STRING_LENGTH = 14
  let round = Math.ceil(length / ROUND_STRING_LENGTH)
  let result = ''

  const createRandomString = () => {
    return (Date.now() * Math.ceil(Math.random() * 1000000))
      .toString(16)
      .substr(0, ROUND_STRING_LENGTH)
  }

  while (round > 0) {
    result += createRandomString()
    round--
  }

  return result.substr(0, length)
}

export {
  randomInt,
  randomString,
  randomItem
}
