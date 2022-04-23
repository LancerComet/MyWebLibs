import { ConstructorOf } from '@lancercomet/types'
import { deserialize } from '@lancercomet/suntori'
import { stringify } from '@lancercomet/utils/url'
import { isFunction } from '@lancercomet/utils/types'

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
  data?: Record<string | number, any> | FormData
  type?: ConstructorOf<(T extends (infer P)[] ? P : T)>,
  options?: FetcherOptions
}

type Interceptor = <T>(param: IFetcherRequestParam<T>) => IFetcherRequestParam<T>

class Fetcher {
  private _interceptors: Interceptor[] = []

  private _createParamByInterceptors<T> (param: IFetcherRequestParam<T>): IFetcherRequestParam<T> {
    let result: IFetcherRequestParam<T> = param
    for (const func of this._interceptors.filter(item => isFunction(item))) {
      result = func(result)
    }
    return result
  }

  setInterceptor (func: Interceptor): number {
    if (!this._interceptors.includes(func)) {
      this._interceptors.push(func)
      return this._interceptors.length - 1
    }
    return -1
  }

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
        body: isGet
          ? undefined
          : isFormData
            ? data
            : JSON.stringify(data)
      })

      result.rawResponse = response

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
}

export {
  Fetcher
}
