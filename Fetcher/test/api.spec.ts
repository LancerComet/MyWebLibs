import { Fetcher } from '../lib'
import { JsonProperty, Serializable } from '@lancercomet/suntori'

describe('API testing.', () => {
  it('It should get API data correctly.', async () => {
    @Serializable()
    class User {
      @JsonProperty('name')
      readonly username: string = ''

      @JsonProperty('age')
      readonly age: number = 0
    }

    const fetcher = new Fetcher()
    const { data, error, code, message, status } = await fetcher.requestAPI({
      url: '/api',
      method: 'GET',
      type: User
    })
    expect(error).toBeUndefined()
    expect(data).toEqual({
      username: 'John Smith',
      age: 100
    })
    expect(code).toBe(1)
    expect(message).toBe('OK')
    expect(status).toBe(200)
  })
})
