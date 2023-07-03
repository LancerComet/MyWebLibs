class List<T> {
  private readonly _items: T[]

  add (item: T): void {
    this._items.push(item)
  }

  contains (target: T): boolean {
    return this._items.includes(target)
  }

  clear () {
    this._items.length = 0
  }

  first (predicate: (item: T) => boolean): T {
    for (const item of this._items) {
      if (predicate(item)) {
        return item
      }
    }
    throw new Error('NO_TARGET_ITEM')
  }

  firstOrDefault (predicate: (item: T) => boolean): T | null {
    for (const item of this._items) {
      if (predicate(item)) {
        return item
      }
    }
    return null
  }

  forEach (callback: (item: T) => void) {
    for (const item of this) {
      callback(item)
    }
  }

  get (index: number): T {
    return this._items[index]
  }

  insert (index: number, item: T): void {
    this._items.splice(index, 0, item)
  }

  get length () {
    return this._items.length
  }

  orderBy<TKey> (keySelector: (item: T) => TKey): List<T> {
    const newArray = [...this._items]
    newArray.sort((a: T, b: T) => {
      const keyA = keySelector(a)
      const keyB = keySelector(b)
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
    return new List(newArray)
  }

  orderByDescending<TKey> (keySelector: (item: T) => TKey): List<T> {
    const newArray = [...this._items]
    newArray.sort((a: T, b: T) => {
      const keyA = keySelector(a)
      const keyB = keySelector(b)
      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
    })
    return new List(newArray)
  }

  removeRange (startIndex: number, deleteCount: number): T[] {
    return this._items.splice(startIndex, deleteCount)
  }

  sequenceEqual (other: List<T>): boolean {
    if (this._items.length !== other._items.length) {
      return false
    }

    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i] !== other._items[i]) {
        return false
      }
    }

    return true
  }

  set (index: number, value: T) {
    this._items[index] = value
  }

  select<U> (selector: (item: T) => U): List<U> {
    return new List(this._items.map(selector))
  }

  selectAll<U> (selector: (item: T) => U[]): List<U> {
    let result: U[] = []
    for (const item of this._items) {
      result = result.concat(selector(item))
    }
    return new List(result)
  }

  skip (count: number): List<T> {
    const result = new List<T>()
    for (let i = count; i < this._items.length; i++) {
      result.add(this._items[i])
    }
    return result
  }

  take (count: number): List<T> {
    const result = new List<T>()
    for (let i = 0; i < Math.min(count, this._items.length); i++) {
      result.add(this._items[i])
    }
    return result
  }

  toArray (): T[] {
    return this._items.slice()
  }

  where (predicate: (item: T) => boolean): List<T> {
    const result = new List<T>()
    for (const item of this._items) {
      if (predicate(item)) {
        result.add(item)
      }
    }
    return result
  }

  [Symbol.iterator] (): Iterator<T> {
    let index = -1
    const data = this._items
    return {
      next: () => ({
        value: data[++index],
        done: !(index in data)
      })
    }
  }

  constructor (items?: T[]) {
    this._items = items ?? []
  }
}

export {
  List
}
