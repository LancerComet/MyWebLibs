import { onMounted, onBeforeUnmount } from 'vue'

const useKeyDown = (onKeyDown: (event: KeyboardEvent) => void) => {
  const destroy = () => {
    window.removeEventListener('keydown', onKeyDown)
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return destroy
}

const useKeyUp = (onKeyUp: (event: KeyboardEvent) => void) => {
  const destroy = () => {
    window.removeEventListener('keyup', onKeyUp)
  }

  onMounted(() => {
    window.addEventListener('keyup', onKeyUp)
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return destroy
}

const useOnResize = (onResize: (event: Event) => void) => {
  const destroy = () => {
    window.removeEventListener('resize', onResize)
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return destroy
}

const useOnScroll = (onScroll: (event: Event) => void) => {
  const destroy = () => {
    window.removeEventListener('scroll', onScroll)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return destroy
}

export {
  useKeyDown,
  useKeyUp,
  useOnResize,
  useOnScroll
}
