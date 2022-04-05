import { createUnixTimestamp } from '../lib/time'

describe('Time 测试.', () => {
  it('createUnixTimestamp.', async () => {
    const ts = createUnixTimestamp()
    expect(typeof ts).toEqual('number')
    expect(ts.toString().length).toEqual(10)
  })
})
