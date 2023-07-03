import { Observable } from '../lib'

describe('Observable', () => {
  let observable: Observable<number>

  beforeEach(() => {
    observable = new Observable<number>()
  })

  test('subscribe and notify', () => {
    const callback = jest.fn()
    observable.subscribe(callback)
    observable.notify(5)
    expect(callback).toHaveBeenCalledWith(5)
  })

  test('unsubscribe', () => {
    const callback = jest.fn()
    const unsubscribe = observable.subscribe(callback)
    observable.notify(5)
    unsubscribe()
    observable.notify(6)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(5)
  })

  test('multiple subscribers', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    observable.subscribe(callback1)
    observable.subscribe(callback2)
    observable.notify(5)
    expect(callback1).toHaveBeenCalledWith(5)
    expect(callback2).toHaveBeenCalledWith(5)
  })
})
