type ObservableCallback<T> = (value: T) => void

class Observable<T> {
  private subscribers: ObservableCallback<T>[] = []

  subscribe (callback: ObservableCallback<T>): () => void {
    if (!this.subscribers.includes(callback)) {
      this.subscribers.push(callback)
    }

    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  notify (data: T) {
    for (const callback of this.subscribers) {
      callback(data)
    }
  }
}

export {
  Observable,
  ObservableCallback
}
