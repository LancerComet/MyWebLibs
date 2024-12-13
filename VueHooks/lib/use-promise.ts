import { readonly, ref } from 'vue'

/**
 * usePromise turns a promise into a reactive state.
 *
 * @param promiseExec
 * @returns
 */
const usePromise = <T>(promiseExec: (...args: any[]) => Promise<T>) => {
  const dataRef = ref<T>()
  const inLoadingRef = ref<boolean>(false)
  const errorRef = ref<Error>()

  const mutate = async (...args: any[]) => {
    if (inLoadingRef.value) {
      return
    }

    errorRef.value = undefined
    inLoadingRef.value = true

    try {
      dataRef.value = await promiseExec(...args)
    } catch (error) {
      errorRef.value = error as Error
    }

    inLoadingRef.value = false
  }

  const replaceState = (payload: T) => {
    dataRef.value = payload
  }

  return {
    data: dataRef,
    inLoading: readonly(inLoadingRef),
    error: readonly(errorRef),
    mutate,
    replaceState
  }
}

export {
  usePromise
}
