/**
 * 向目标节点添加 Class.
 *
 * @export
 * @param {HTMLElement} element
 * @param {string} className
 */
function addClass (element: HTMLElement, className: string) {
  const classNameList = element.className.split(' ')
  if (classNameList.indexOf(className) < 0) {
    const name = (element.className + ' ' + className).trim()
    element.className = name
  }
}

/**
 * 检查目标节点是否包含目标类名.
 *
 * @param {HTMLElement} element 目标节点.
 * @param {string} className 目标类名.
 * @returns {boolean}
 */
function hasClass (element: HTMLElement, className: string): boolean {
  return element.className.indexOf(className) > -1
}

/**
 * 移除一个 ClassName.
 *
 * @param {HTMLElement} element
 * @param {string} className
 */
function removeClass (element: HTMLElement, className: string) {
  element.className = element.className
    .replace(new RegExp(` ?\\b${className}\\b`, 'g'), '')
    .trim()
}

/**
 * 检测元素是否在页面中被完全展示.
 *
 * @param {(HTMLElement | Node)} target 目标元素节点.
 * @param {boolean} [isDoVisualCheck=true] 检测元素是否被其他元素视觉上遮挡.
 * @returns
 */
function checkIsFullyVisible (target: HTMLElement | Node, isDoVisualCheck: boolean = true) {
  let element = null
  if (target) {
    if (target.nodeType === 3) {
      element = target.parentElement
    } else if (target.nodeType === 1) {
      element = target
    }
  }

  if (!element) {
    return false
  }

  const viewportWidth = document.documentElement.clientWidth || window.innerWidth
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight
  const rect = (element as HTMLElement).getBoundingClientRect()
  const { top, bottom, left, right } = rect

  if (top < 0 || left < 0 || bottom > viewportHeight || right > viewportWidth) {
    return false
  }

  if (isDoVisualCheck) {
    // 使用坐标再次验证检测元素是否被遮挡或隐藏.
    const checkpoints = [
      { x: left, y: top },
      { x: right - 1, y: bottom - 1 } // 这里需要减一个像素否则会获取到别的元素, 浏览器边界判断问题.
    ]

    for (const point of checkpoints) {
      const { x, y } = point
      let pointElement = document.elementFromPoint(x, y)
      if (pointElement === element) {
        continue
      }

      while (true) {
        if (!pointElement || !pointElement.parentElement) {
          return false
        }

        if (pointElement === element) {
          break
        }

        pointElement = pointElement.parentElement
      }
    }
  }

  return true
}

export {
  addClass,
  removeClass,
  hasClass,
  checkIsFullyVisible
}
