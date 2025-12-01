import { onBeforeUnmount, ref } from 'vue'

/**
 * useObjectUrl 用于创建可自动回收的 Object URL.
 *
 * @example
 * const { urlRef, setUrl } = useObjectUrl()
 * setUrl(URL.createObjectURL(blob))  // 组件在卸载时会自动回收 Object URL.
 */
const useObjectUrl = (initalValue?: string) => {
  const urlRef = ref<string>(initalValue || '')

  const revoke = () => {
    if (urlRef.value) {
      URL.revokeObjectURL(urlRef.value)
      urlRef.value = ''
    }
  }

  const setUrl = (url: string) => {
    revoke()
    urlRef.value = url
  }

  onBeforeUnmount(() => {
    revoke()
  })

  return {
    urlRef,
    setUrl,
    revoke
  }
}

export {
  useObjectUrl
}
