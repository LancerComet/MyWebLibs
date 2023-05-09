type Callback = (fps: number) => void

class FpsCounter {
  private _lastLoop: number = 0
  private _fps: number = 0
  private _isStart: boolean = false
  private _callbacks: Callback[] = []

  private _tick () {
    const thisLoop = performance.now()
    this._fps = Math.floor(1000 / (thisLoop - this._lastLoop))
    this._lastLoop = thisLoop
    if (this._isStart) {
      requestAnimationFrame(this._tick)
    }
  }

  get fps () {
    return this._fps
  }

  start () {
    this._isStart = true
    this._tick()
  }

  stop () {
    this._isStart = false
  }

  onTick (callback: Callback) {
    if (!this._callbacks.includes(callback)) {
      this._callbacks.push(callback)
    }

    return () => {
      const index = this._callbacks.indexOf(callback)
      if (index > -1) {
        this._callbacks.splice(index, 1)
      }
    }
  }
}

export {
  FpsCounter
}
