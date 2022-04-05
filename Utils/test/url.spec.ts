import { getTargetQueryStringValue, getAllQueryStringValues, stringify } from '../lib/url'

describe('Url 测试.', () => {
  it('getAllQueryStringValues.', () => {
    const qs = getAllQueryStringValues()
    expect(qs).toEqual({ name: 'LancerComet', age: '28' }) // 在 jset 配置的 testUrl 中定义.
  })

  it('getTargetQueryStringValue', () => {
    expect(getTargetQueryStringValue('name')).toEqual('LancerComet')
    expect(getTargetQueryStringValue('age')).toEqual('28')
  })

  it('stringify', () => {
    expect(stringify({ name: 'wch', age: 29 })).toBe('name=wch&age=29')
  })
})
