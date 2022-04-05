import { tenThousand, hundredMillion } from '../lib/format'

describe('Format 测试.', () => {
  it('应当正确格式化数字.', () => {
    expect(tenThousand(9999)).toEqual('9999')
    expect(tenThousand(10000)).toEqual('1.0 万')

    expect(tenThousand(254000, 0)).toEqual('25 万')
    expect(tenThousand(255000, 0)).toEqual('26 万')

    expect(tenThousand(259900, 2)).toEqual('25.99 万')
    expect(tenThousand(259990, 2)).toEqual('26.00 万')

    expect(hundredMillion(99999999)).toEqual('99999999')
    expect(hundredMillion(100000000)).toEqual('1.0 亿')

    expect(hundredMillion(2500000000, 0)).toEqual('25 亿')
    expect(hundredMillion(2550000000, 0)).toEqual('26 亿')

    expect(hundredMillion(2599000000, 2)).toEqual('25.99 亿')
    expect(hundredMillion(2599900000, 2)).toEqual('26.00 亿')
  })
})
