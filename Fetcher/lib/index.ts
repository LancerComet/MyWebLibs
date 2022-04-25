import { ConstructorOf } from '@lancercomet/types'
import { deserialize } from '@lancercomet/suntori'

interface IApiResponse<T = unknown> {
  data: T
  code: number
  message: string
}

interface IFetchResult<T, E = Error> {
  data: T | undefined
  error: E | undefined
  status: number
}

interface IFetcherApiResult<T, E = Error> extends IFetchResult<T, E> {
  message: string
  code: number
}

interface IFetcherOptions {
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  redirect?: RequestRedirect
  referrerPolicy?: ReferrerPolicy
}

interface IFetcherRequestParam {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION',
  data?: Record<string | number, unknown> | FormData
  options?: IFetcherOptions
}

interface IFetcherRequestJSONParam<T> extends IFetcherRequestParam {
  type?: ConstructorOf<(T extends (infer P)[] ? P : T)>,
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

type Interceptor = (param: IFetcherRequestParam) => IFetcherRequestParam

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

  private _createParamByInterceptors<T> (param: IFetcherRequestParam): IFetcherRequestParam {
    let result: IFetcherRequestParam = param
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

  private async _request (param: IFetcherRequestParam): Promise<Response> {
    param = this._createParamByInterceptors(param)

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
      return response
    } catch (error) {
      clearTimeout(timeoutTimer)
      throw error
    }
  }

  /**
   * Send Http request and read the response as JSON.
   *
   * @template T
   * @param {IFetcherRequestParam<T>} param
   */
  async requestJSON <T> (param: IFetcherRequestJSONParam<T>): Promise<IFetchResult<T>> {
    const result: IFetchResult<T> = {
      data: undefined,
      error: undefined,
      status: 0
    }

    try {
      const response = await this._request(param)
      result.status = response.status

      if (response.status >= 400) {
        throw new Error(`Http ${status}`)
      }

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
      result.error = error as Error
    }

    return result
  }

  /**
   * Send http request and read the response as "The API".
   *
   * @param param
   */
  async requestAPI <T> (param: IFetcherRequestJSONParam<T>): Promise<IFetcherApiResult<T>> {
    const result: IFetcherApiResult<T> = {
      data: undefined,
      error: undefined,
      status: 0,
      code: 0,
      message: ''
    }

    try {
      const response = await this._request(param)
      result.status = response.status

      if (response.status >= 400) {
        throw new Error(`Http ${status}`)
      }

      const apiResponse = await response.json() as IApiResponse
      result.code = apiResponse.code
      result.message = apiResponse.message

      const type = param.type
      const data = apiResponse.data
      if (!type) {
        result.data = data as T
      } else {
        if (Array.isArray(data)) {
          result.data = data.map(item => deserialize(item, type)) as unknown as T
        } else {
          result.data = deserialize(data, type) as T
        }
      }
    } catch (error) {
      result.error = error as Error
    }

    return result
  }

  /**
   * Send http request and read the response as ArrayBuffer.
   *
   * @param param
   * @param type
   */
  async requestBinary (param: IFetcherRequestParam, type: 'arraybuffer'): Promise<IFetchResult<ArrayBuffer>>
  async requestBinary (param: IFetcherRequestParam, type: 'blob'): Promise<IFetchResult<Blob>>
  async requestBinary (param: IFetcherRequestParam, type: 'arraybuffer' | 'blob'): Promise<IFetchResult<unknown>> {
    const result: IFetchResult<unknown> = {
      data: undefined,
      error: undefined,
      status: 0
    }
    try {
      const response = await this._request(param)
      result.status = response.status

      if (response.status >= 400) {
        throw new Error(`Http ${status}`)
      }

      if (type === 'arraybuffer') {
        result.data = await response.arrayBuffer()
      } else {
        result.data = await response.blob()
      }
    } catch (error) {
      result.error = error as Error
    }

    return result
  }

  constructor (param?: IFetcher) {
    this._param = param
  }
}

export {
  Fetcher,
  IApiResponse,
  IFetchResult,
  IFetcherApiResult,
  IFetcherOptions,
  IFetcherRequestParam,
  IFetcherRequestJSONParam,
  IFetcher,
  Interceptor
}
