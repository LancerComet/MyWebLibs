class List<T> {
  private readonly _items: T[]

  /**
   * Add a new item into the list.
   *
   * @param item
   */
  add (item: T): void {
    this._items.push(item)
  }

  /**
   * Check whether the list contains the target item.
   *
   * @param target
   * @returns
   */
  contains (target: T): boolean {
    return this._items.includes(target)
  }

  /**
   * Empty the list.
   */
  clear () {
    this._items.length = 0
  }

  /**
   * Find the first item that satisfies the predicate.
   * If no matching item is found, an exception will be thrown.
   *
   * @param predicate Function to test each element of the list.
   * @returns The first item in the list that satisfies the provided predicate function.
   * @throws {Error} When no matching item is found.
   */
  first (predicate: (item: T) => boolean): T {
    for (const item of this._items) {
      if (predicate(item)) {
        return item
      }
    }
    throw new Error('NO_TARGET_ITEM')
  }

  /**
   * Finds the first item that satisfies the given predicate.
   * Returns null if no matching item is found.
   *
   * @param predicate The function to test each element of the list.
   * @returns The first item in the list that satisfies the provided predicate function, or null if none found.
   */
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

  /**
   * Orders the list based on the keySelector and returns a new sorted list.
   *
   * @param keySelector A function to extract a key from an item.
   * @returns A new List sorted by the keys obtained from the keySelector function.
   */
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

  /**
   * Orders the list in descending order based on the keySelector and returns a new sorted list.
   *
   * @param keySelector A function to extract a key from an item.
   * @returns A new List sorted in descending order by the keys obtained from the keySelector function.
   */
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

  /**
   * Returns a shuffled copy of the current list.
   *
   * @returns A new list that is a shuffled version of the current list.
   */
  shuffle (): List<T> {
    const array = this._items.slice()
    let currentIndex = array.length; let temporaryValue; let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return new List(array)
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
