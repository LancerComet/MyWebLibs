import { isSupportWebp } from '../lib/images'

describe('Images 测试.', () => {
  it('isSupportWebp.', async () => {
    expect(isSupportWebp()).toEqual(false)
  })
})
