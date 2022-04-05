/**
 * 在下一个 Job 内执行函数.
 *
 * @export
 * @param {() => void} callback
 */
function nextJob (callback: () => void) {
  setTimeout(function () {
    typeof callback === 'function' && callback()
  }, 1)
}

/**
 * 模拟线程阻塞.
 *
 * @param {number} time
 */
function sleep (time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export {
  nextJob,
  sleep
}
