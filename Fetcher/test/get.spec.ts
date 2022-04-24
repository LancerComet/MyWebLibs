import { Fetcher } from '../lib'
import { JsonProperty, Serializable } from '@lancercomet/suntori'

describe('GET testing.', () => {
  it('It should send get request properly.', async () => {
    const fetcher = new Fetcher()
    const { error, data, status, rawResponse } = await fetcher.request({
      url: '/me',
      method: 'GET'
    })
    const expected = {
      name: 'John Smith',
      age: 100
    }
    expect(error).toBeUndefined()
    expect(status).toBe(200)
    expect(data).toEqual(expected)
    expect(await rawResponse?.json()).toEqual(expected)
  })

  it('It should work well with SunTori.', async () => {
    @Serializable()
    class User {
      @JsonProperty('name')
      readonly username: string = ''

      @JsonProperty('age')
      readonly age: number = 0
    }

    const fetcher = new Fetcher()
    const { data, error, rawResponse, status } = await fetcher.request({
      url: '/user',
      method: 'GET',
      data: {
        id: 1,
        isAdmin: false
      },
      type: User
    })

    expect(error).toBeUndefined()
    expect(status).toBe(200)
    expect(data).toEqual({
      username: 'Admin',
      age: 1
    })
    expect(data instanceof User).toBe(true)
    expect(await rawResponse?.json()).toEqual({
      name: 'Admin',
      age: 1
    })
  })
})
