import { Fetcher } from '../lib'
import { JsonProperty, Serializable } from '@lancercomet/suntori'

describe('GET testing.', () => {
  it('It should send get requests properly.', async () => {
    const fetcher = new Fetcher()
    const { error, data, status } = await fetcher.requestJSON({
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
  })

  it('It should send the FormData properly.', async () => {
    const fetcher = new Fetcher()

    const formData = new FormData()
    formData.append('name', 'John Smith')
    formData.append('age', '100')

    const { data, error } = await fetcher.requestJSON({
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

  it('It should send the JSON object properly.', async () => {
    const fetcher = new Fetcher()

    const body = {
      name: 'John Smith',
      age: '100'
    }

    const { data, error } = await fetcher.requestJSON({
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
    const { data, error, status } = await fetcher.requestJSON({
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
  })

  it('It should be fine to read the result as binary.', async () => {
    const fetcher = new Fetcher()

    const response1 = await fetcher.requestBinary({
      url: '/binary',
      method: 'GET'
    }, 'arraybuffer')
    expect(response1.data?.byteLength).toBe(6060)

    const response2 = await fetcher.requestBinary({
      url: '/binary',
      method: 'GET'
    }, 'blob')
    expect(response2.data?.type).toBe('application/json')
  })
})
