/**
 * 创建 Unix 时间戳.
 *
 * @param {number} [ts=Date.now()]
 * @returns {number}
 */
function createUnixTimestamp (ts: number = Date.now()): number {
  return parseInt(ts.toString().substr(0, 10), 10)
}

export {
  createUnixTimestamp
}
