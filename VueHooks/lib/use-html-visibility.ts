import { Ref, onMounted, onBeforeUnmount, ref } from 'vue'

interface VisibilityOptions extends IntersectionObserverInit {
  /**
   * 是否只触发一次.
   */
  once?: boolean
}

function useHtmlVisibility<T extends HTMLElement> (
  elementRef: Ref<T | null>,
  callback?: (isVisible: boolean) => void,
  options?: VisibilityOptions
): Ref<boolean> {
  const isVisibleRef = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const element = elementRef.value
    if (!element) {
      return
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === element) {
          const visible = entry.isIntersecting
          isVisibleRef.value = visible
          callback?.(visible)

          if (options?.once && visible && observer) {
            observer.unobserve(entry.target)
            observer.disconnect()
            observer = null
          }
        }
      }
    }, {
      root: null, // 默认 viewport
      threshold: 0.1, // 可见 10% 就算可见
      ...options
    })

    observer.observe(element)
  })

  onBeforeUnmount(() => {
    const element = elementRef.value
    if (observer && element) {
      observer.unobserve(element)
      observer.disconnect()
      observer = null
    }
  })

  return isVisibleRef
}

export {
  VisibilityOptions,
  useHtmlVisibility
}
