import { Fetcher } from '../lib'

describe('GET testing.', () => {
  it('It should send get request properly.', (done) => {
    const fetcher = new Fetcher({
      timeout: 5000
    })
    fetcher.request({
      url: '/me',
      method: 'GET'
    }).then(item => {
      expect((item.error?.message ?? '').toLowerCase()).toContain('abort')
      done()
    })
    fetcher.abort()
  })
})
