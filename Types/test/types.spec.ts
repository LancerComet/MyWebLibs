import {
  ConstructorOf, DateString,
  IAsyncResult, Int64String, IntBoolean,
  JsonString
} from '../lib'

describe('Types unit testing.', () => {
  it('Int64String', () => {
    const a: Int64String = '10.34e'
    expect(/^(\d|e|\.)+$/.test(a)).toBe(true)
  })

  it('DateString', () => {
    const a: DateString = '2020-01-01T00:00:00Z'
    const date = new Date(a)
    expect(date.getFullYear()).toBe(2020)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(1)
  })

  it('IntBoolean', () => {
    expect(IntBoolean.False).toBe(0)
    expect(IntBoolean.True).toBe(1)
  })

  it('ConstructorOf', () => {
    class A {}
    const B: ConstructorOf<A> = A
    expect(B).toBe(A)
  })

  it('IAsyncResult', () => {
    const getData: () => IAsyncResult<number> = () => {
      return {
        data: 0,
        error: undefined
      }
    }

    expect(getData()).toEqual({
      data: 0,
      error: undefined
    })
  })

  it('JsonString', () => {
    const a: JsonString = '{ "name": "John Smith" }'
    expect(JSON.parse(a)).toEqual({
      name: 'John Smith'
    })
  })
})
