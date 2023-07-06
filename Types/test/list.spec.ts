import { List } from '../lib'
describe('List testing.', () => {
  let list: List<number>

  beforeEach(() => {
    list = new List<number>([1, 2, 3, 4, 5])
  })

  test('add', () => {
    list.add(6)
    expect(list.get(5)).toBe(6)
  })

  test('contains', () => {
    expect(list.contains(1)).toBeTruthy()
    expect(list.contains(6)).toBeFalsy()
  })

  test('clear', () => {
    list.clear()
    expect(list.length).toBe(0)
  })

  test('first', () => {
    const item = list.first(item => item > 3)
    expect(item).toBe(4)
    expect(() => list.first(item => item > 5)).toThrow('NO_TARGET_ITEM')
  })

  test('firstOrDefault', () => {
    const item = list.firstOrDefault(item => item > 3)
    expect(item).toBe(4)
    expect(list.firstOrDefault(item => item > 5)).toBeNull()
  })

  test('forEach', () => {
    let sum = 0
    list.forEach(item => {
      sum += item
    })
    expect(sum).toBe(15)
  })

  test('insert', () => {
    list.insert(0, 0)
    expect(list.get(0)).toBe(0)
  })

  test('orderBy', () => {
    const orderedList = list.orderBy(item => item)
    expect(orderedList.toArray()).toEqual([1, 2, 3, 4, 5])
  })

  test('orderByDescending', () => {
    const orderedList = list.orderByDescending(item => item)
    expect(orderedList.toArray()).toEqual([5, 4, 3, 2, 1])
  })

  test('removeRange', () => {
    const removedItems = list.removeRange(0, 2)
    expect(removedItems).toEqual([1, 2])
    expect(list.toArray()).toEqual([3, 4, 5])
  })

  test('sequenceEqual', () => {
    const anotherList = new List<number>([1, 2, 3, 4, 5])
    expect(list.sequenceEqual(anotherList)).toBeTruthy()
    anotherList.add(6)
    expect(list.sequenceEqual(anotherList)).toBeFalsy()
  })

  test('select', () => {
    const newList = list.select(item => item * 2)
    expect(newList.toArray()).toEqual([2, 4, 6, 8, 10])
  })

  test('selectAll', () => {
    const newList = list.selectAll(item => [item, item * 2])
    expect(newList.toArray()).toEqual([1, 2, 2, 4, 3, 6, 4, 8, 5, 10])
  })

  it('shuffle', () => {
    const initialItems = [1, 2, 3, 4, 5]
    const list = new List(initialItems).shuffle()
    const shuffledItems = list.toArray()

    // Verify that all original items are still present after shuffling
    for (const item of initialItems) {
      expect(shuffledItems).toContain(item)
    }

    // Due to the randomness of the shuffle, it is highly unlikely (but not impossible)
    // that the shuffled items are in the exact same order as the initial items.
    // If this test occasionally fails, that does not necessarily indicate a problem.
    expect(shuffledItems).not.toEqual(initialItems)
  })

  test('skip', () => {
    const skippedList = list.skip(2)
    expect(skippedList.length).toBe(3)
    expect(skippedList.get(0)).toBe(3)
  })

  test('take', () => {
    const takenList = list.take(2)
    expect(takenList.length).toBe(2)
    expect(takenList.get(0)).toBe(1)
    expect(takenList.get(1)).toBe(2)
  })

  test('toArray', () => {
    const array = list.toArray()
    expect(array).toEqual([1, 2, 3, 4, 5])
  })

  test('where', () => {
    const filteredList = list.where(x => x > 2)
    expect(filteredList.length).toBe(3)
    expect(filteredList.get(0)).toBe(3)
  })

  test('iterator', () => {
    const array = [...list]
    expect(array).toEqual([1, 2, 3, 4, 5])
  })
})
