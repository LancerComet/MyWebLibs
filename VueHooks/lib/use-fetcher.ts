import type { IFetcherApiResult } from '@lancercomet/fetcher'
import { ref, readonly } from 'vue'

type FetcherFunction<P, T> = ((param: P) => Promise<IFetcherApiResult<T>>) | (() => Promise<IFetcherApiResult<T>>)

/**
 * useFetch makes you use fetcher in Vue Composition API.
 *
 * @template P
 * @template T
 * @param {FetcherFunction<P, T>} fetchExec
 * @returns
 */
function useFetch<P, T> (fetchExec: FetcherFunction<P, T>) {
  const dataRef = ref<T>()
  const inLoadingRef = ref<boolean>(false)
  const errorRef = ref<Error>()

  const mutate = async (param?: P) => {
    if (inLoadingRef.value) {
      return
    }

    errorRef.value = undefined
    inLoadingRef.value = true

    try {
      let result: IFetcherApiResult<T>
      if (fetchExec.length === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result = await fetchExec()
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result = await fetchExec(param)
      }

      if (result.error) {
        errorRef.value = result.error
      } else {
        dataRef.value = result.data
      }
    } catch (error) {
      errorRef.value = error as Error
    } finally {
      inLoadingRef.value = false
    }
  }

  const replaceState = (payload: T) => {
    dataRef.value = payload
  }

  return {
    data: readonly(dataRef),
    inLoading: readonly(inLoadingRef),
    error: readonly(errorRef),
    mutate,
    replaceState
  }
}

export {
  useFetch
}
