class Semaphore {
  private _availablePermits: number = 0
  private _maxCount: number = 0
  private _waiters: (() => void)[] = []

  get availablePermits (): number {
    return this._availablePermits
  }

  get maxCount (): number {
    return this._maxCount
  }

  waitAsync () {
    return new Promise<void>((resolve) => {
      if (this._availablePermits > 0) {
        this._availablePermits--
        resolve()
      } else {
        this._waiters.push(() => resolve())
      }
    })
  }

  release () {
    if (this._waiters.length > 0) {
      const resolve = this._waiters.shift()
      resolve?.()
    } else if (this._availablePermits < this._maxCount) {
      this._availablePermits++
    } else {
      throw new Error('Semaphore release error: max permit count exceeded.')
    }
  }

  constructor (initialCount: number, maxCount: number) {
    this._availablePermits = initialCount
    this._maxCount = maxCount
  }
}

export {
  Semaphore
}
