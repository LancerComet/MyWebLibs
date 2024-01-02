/* eslint-disable no-undef */
import { Semaphore } from '../lib'

it('Should receive a hello.', async () => {
  const semaphore = new Semaphore(3, 3)

  expect(semaphore.availablePermits).toBe(3)
  expect(semaphore.maxCount).toBe(3)

  const tasks: Array<Promise<void>> = []
  const executing: number[] = []

  new Array(10)
    .fill(0)
    .forEach((_, index) => {
      executing.push(index)
      const task = semaphore.waitAsync()
        .then(() => sleep(Math.floor(Math.random() * 500)))
        .then(() => {
          semaphore.release()
          executing.splice(executing.indexOf(index), 1)
        })
      tasks.push(task)
    })

  expect(executing.length).toBe(10)
  await Promise.all(tasks)
  expect(executing.length).toBe(0)
})

function sleep (ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
