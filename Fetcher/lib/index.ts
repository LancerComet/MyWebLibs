import { ConstructorOf } from '@lancercomet/types'
import { deserialize } from '@lancercomet/suntori'

interface IFetchResult<T, E = Error> {
  data?: T
  error?: E
  status: number
  rawResponse?: Response
}

interface FetcherOptions {
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  redirect?: RequestRedirect
  referrerPolicy?: ReferrerPolicy
}

interface IFetcherRequestParam<T> {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION',
  data?: Record<string | number, unknown> | FormData
  type?: ConstructorOf<(T extends (infer P)[] ? P : T)>,
  options?: FetcherOptions
}

interface IFetcher {
  /**
   * Base url.
   *
   * @default undefined
   */
  baseUrl?: string

  /**
   * Timeout.
   *
   * @default undefined
   */
  timeout?: number
}

type Interceptor = <T>(param: IFetcherRequestParam<T>) => IFetcherRequestParam<T>

const stringify = (obj: Record<any, any>): string => {
  return new URLSearchParams(obj).toString()
}

const isFunction = (target: unknown): boolean => {
  return typeof target === 'function'
}

/**
 * Fetcher.
 *
 * @class Fetcher
 */
class Fetcher {
  private _param?: IFetcher = undefined
  private _interceptors: Interceptor[] = []
  private _abortController: AbortController = new AbortController()

  private _createParamByInterceptors<T> (param: IFetcherRequestParam<T>): IFetcherRequestParam<T> {
    let result: IFetcherRequestParam<T> = param
    for (const func of this._interceptors.filter(item => isFunction(item))) {
      result = func(result)
    }
    return result
  }

  /**
   * Abort requesting.
   */
  abort () {
    this._abortController?.abort()
  }

  /**
   * Add a function to intercept the request.
   *
   * @param {Interceptor} func The interceptor function.
   * @returns {() => void} The function to remove the interceptor.
   */
  setInterceptor (func: Interceptor): () => void {
    if (!this._interceptors.includes(func)) {
      this._interceptors.push(func)
    }
    return () => {
      const index = this._interceptors.indexOf(func)
      if (index > -1) {
        this._interceptors.splice(index, 1)
      }
    }
  }

  /**
   * Send Http request.
   *
   * @template T
   * @param {IFetcherRequestParam<T>} param
   */
  async request <T> (param: IFetcherRequestParam<T>): Promise<IFetchResult<T>> {
    param = this._createParamByInterceptors<T>(param)

    let url = param.url ?? ''
    const method = param.method
    const data = param.data ?? {}
    const headers: HeadersInit = {}
    const isGet = method === 'GET'
    const isFormData = data instanceof FormData

    if (method === 'GET') {
      const queryString = stringify(data)
      if (queryString) {
        url += '?' + queryString
      }
    } else {
      headers['Content-Type'] = isFormData ? 'multipart/form-data' : 'application/json'
    }
    Object.assign(headers, param.options?.headers ?? {})

    const baseUrl = this._param?.baseUrl
    if (baseUrl) {
      url = baseUrl + url
    }

    this._abortController = new AbortController()

    const timeout = this._param?.timeout ?? -1
    let timeoutTimer = null as any
    if (timeout > -1) {
      timeoutTimer = setTimeout(() => this.abort(), timeout)
    }

    const result: IFetchResult<T> = {
      status: 200
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        cache: param.options?.cache,
        credentials: param.options?.credentials,
        redirect: param.options?.redirect,
        referrerPolicy: param.options?.referrerPolicy,
        signal: this._abortController.signal,
        body: isGet
          ? undefined
          : isFormData
            ? data
            : JSON.stringify(data)
      })
      clearTimeout(timeoutTimer)

      result.rawResponse = response.clone()

      const json = await response.json() as T
      const type = param.type

      if (!type) {
        result.data = json
      } else {
        if (Array.isArray(json)) {
          result.data = json.map(item => deserialize(item, type)) as unknown as T
        } else {
          result.data = deserialize(json, type) as T
        }
      }
    } catch (error) {
      clearTimeout(timeoutTimer)
      result.error = error as Error
    }

    return result
  }

  constructor (param?: IFetcher) {
    this._param = param
  }
}

export {
  Fetcher
}
