const CHAR_REGEX = charRegex()

/**
 * 将字符串转化为驼峰.
 *
 * @example
 * toCamelCase('lancer-comet') // lancerComet
 *
 * @param {string} text
 * @returns {string}
 */
function toCamelCase (text: string): string {
  return text.replace(/-\w/g, clearAndUpper)
}

/**
 * 将字符串转换为帕斯卡.
 *
 * @example
 * toPascalCase('lancerc-comet')  // LancerComet
 *
 * @param {string} text
 * @returns {string}
 */
function toPascalCase (text: string): string {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

/**
 * 将字符串转化为 KebabCase.
 *
 * @example
 * toKebabCase('lancerComet')  // lancer-comet
 *
 * @param {string} text
 * @returns {string}
 */
function toKebabCase (text: string): string {
  return toPascalCase(text)
    .replace(/[A-Z]/g, t => '-' + t.toLowerCase())
    .replace(/^-/, '')
    .replace(/-$/, '')
}

/**
 * 获取字符串字节长度.
 * 一个汉字（双字节字符）将被当作两个字节统计.
 *
 * @param {string} str
 * @returns {number}
 */
function getStringByteLength (str: string): number {
  return typeof str !== 'string'
    ? 0
    : str.replace(/[\u4e00-\u9fa5]/g, 'aa').length
}

/**
 * 获取字符串字符长度.
 * 此方法将把任意一个字符统计为 1, 包括 Unicode 的颜文字.
 *
 * @param {string} str
 * @returns {number}
 */
function getStringCharCount (str: string): number {
  return typeof str !== 'string'
    ? 0
    : str.match(CHAR_REGEX)?.length ?? 0
}

export {
  getStringByteLength,
  toCamelCase,
  toPascalCase,
  toKebabCase,
  getStringCharCount

}

function charRegex () {
  // Used to compose unicode character classes.
  const astralRange = '\\ud800-\\udfff'
  const comboMarksRange = '\\u0300-\\u036f'
  const comboHalfMarksRange = '\\ufe20-\\ufe2f'
  const comboSymbolsRange = '\\u20d0-\\u20ff'
  const comboMarksExtendedRange = '\\u1ab0-\\u1aff'
  const comboMarksSupplementRange = '\\u1dc0-\\u1dff'
  const comboRange = comboMarksRange + comboHalfMarksRange + comboSymbolsRange +
   comboMarksExtendedRange + comboMarksSupplementRange
  const varRange = '\\ufe0e\\ufe0f'
  const familyRange = '\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93'

  // Used to compose unicode capture groups.
  const astral = `[${astralRange}]`
  const combo = `[${comboRange}]`
  const fitz = '\\ud83c[\\udffb-\\udfff]'
  const modifier = `(?:${combo}|${fitz})`
  const nonAstral = `[^${astralRange}]`
  const regional = '(?:\\uD83C[\\uDDE6-\\uDDFF]){2}'
  const surrogatePair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
  const zwj = '\\u200d'
  const blackFlag = '(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40' +
    '(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)'
  const family = `[${familyRange}]`

  // Used to compose unicode regexes.
  const optModifier = `${modifier}?`
  const optVar = `[${varRange}]?`
  const optJoin = `(?:${zwj}(?:${[nonAstral, regional, surrogatePair].join('|')})${optVar + optModifier})*`
  const seq = optVar + optModifier + optJoin
  const nonAstralCombo = `${nonAstral}${combo}?`
  const symbol = `(?:${[nonAstralCombo, combo, regional, surrogatePair, astral, family].join('|')})`

  // Used to match [String symbols](https://mathiasbynens.be/notes/javascript-unicode).
  return new RegExp(`${blackFlag}|${fitz}(?=${fitz})|${symbol + seq}`, 'g')
}

function clearAndUpper (text: string): string {
  return text.replace(/-/, '').toUpperCase()
}
