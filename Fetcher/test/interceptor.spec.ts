import { Fetcher } from '../lib'

describe('Interceptor testing.', () => {
  it('Interceptors should be invoked, and can be revoked properly.', async () => {
    const fetcher = new Fetcher()

    const revoke = fetcher.setInterceptor(config => {
      config.url = config.url + '/with-path'
      return config
    })

    const revoke2 = fetcher.setInterceptor(config => {
      expect(config.url).toBe('/interceptor/with-path')
      revoke()
      revoke2()
      return config
    })

    const response1 = await fetcher.request({
      url: '/interceptor',
      method: 'GET'
    })
    expect(response1.data).toEqual({ message: '/interceptor/with-path' })

    const response2 = await fetcher.request({
      url: '/interceptor',
      method: 'GET'
    })
    expect(response2.data).toEqual({ message: '/interceptor' })
  })
})
