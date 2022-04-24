import { Fetcher } from '../lib'

describe('Error handling testing.', () => {
  it('It should handle exception properly.', async () => {
    const fetcher = new Fetcher()

    const { data, error, status } = await fetcher.request({
      url: '/400',
      method: 'GET'
    })

    expect(status).toBe(400)
    expect(typeof error).toBe('object')
    expect(data).toBeUndefined()
  })
})
