/**
 * 获取页面滚动高度.
 *
 * @return {number}
 */
function getScrollTop (): number {
  return document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
}

/**
 * 以动画效果滚动 Y 轴.
 *
 * @param {[number = 0]} y 滚动至目标位置，默认为 0.
 */
function scrollYWithAnimation (y: number = 0) {
  const scrollTop = getScrollTop()
  const delta = y - scrollTop

  let target = scrollTop + delta * 0.4

  const reachedTarget = Math.abs(y - target) < 30
  const reachedEnd = target + window.innerHeight >= (
    document.documentElement.scrollHeight || document.body.scrollHeight
  )

  if (reachedTarget || reachedEnd) {
    target = y
  }

  window.scrollTo(0, target)

  if (target !== y) {
    requestAnimationFrame(() => scrollYWithAnimation(y))
  }
}

/**
 * 检查是否滚动到了顶部.
 */
function checkIsReachTop (element: HTMLElement): boolean {
  return element.scrollTop <= 0
}

/**
 * 检查是否滚动到了底部.
 */
function checkIsReachBottom (element: HTMLElement): boolean {
  return element.scrollHeight - element.scrollTop <= element.offsetHeight
}

export {
  getScrollTop,
  scrollYWithAnimation,
  checkIsReachTop,
  checkIsReachBottom
}
