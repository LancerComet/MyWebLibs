import { greeting } from '../lib/index'

describe('Greeting test.', () => {
  it('Should receive a hello.', () => {
    expect(greeting()).toBe('Hello')
  })
})
