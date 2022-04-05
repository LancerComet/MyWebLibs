import { sleep, nextJob } from '../lib/tasks'

describe('Task 测试.', () => {
  it('sleep.', async () => {
    const ts = Date.now()
    await sleep(520)
    expect(Date.now() - ts >= 500)
  })

  it('nextJob 测试.', done => {
    nextJob(() => {
      done()
    })
  })
})
