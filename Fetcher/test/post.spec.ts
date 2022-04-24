import { Fetcher } from '../lib'
import { JsonProperty, Serializable } from '@lancercomet/suntori'

describe('POST testing.', () => {
  it('It should send FormData properly.', async () => {
    const fetcher = new Fetcher()

    const formData = new FormData()
    formData.append('name', 'John Smith')
    formData.append('age', '100')

    const { data, error } = await fetcher.request({
      url: '/passthrough',
      method: 'POST',
      data: formData
    })

    expect(error).toBeUndefined()
    expect(data).toEqual({
      name: 'John Smith',
      age: '100'
    })
  })

  it('It should send json object properly.', async () => {
    const fetcher = new Fetcher()

    const body = {
      name: 'John Smith',
      age: '100'
    }

    const { data, error } = await fetcher.request({
      url: '/passthrough',
      method: 'POST',
      data: body
    })

    expect(error).toBeUndefined()
    expect(data).toEqual(body)
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
      url: '/passthrough',
      method: 'POST',
      data: {
        name: 'John Smith',
        age: 100
      },
      type: User
    })

    expect(error).toBeUndefined()
    expect(status).toBe(200)
    expect(data).toEqual({
      username: 'John Smith',
      age: 100
    })
    expect(data instanceof User).toBe(true)
    expect(await rawResponse?.json()).toEqual({
      name: 'John Smith',
      age: 100
    })
  })
})
