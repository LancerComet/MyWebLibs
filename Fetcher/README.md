# Fetcher

Yet another fetcher.

## Quick start

```ts
import { Fetcher } from '@lancercomet/fetcher'

const fetcher = new Fetcher()

const { data, error } = await fetcher.request({
  url: '/me',
  method: 'GET'
})
```

## Abort a request

```tsx
import { Fetcher } from '@lancercomet/fetcher'

const fetcher = new Fetcher()

const sendRequest = async () => {
  const { data, error } = await fetcher.request({
    url: '/me',
    method: 'GET'
  })
  // ...
}

const abortRequest = () => {
  fetcher.abort()
}

<button onClick={sendRequest}>Send</button>
<button onclick={abortRequest}>Abort</button>
```

## Work with SunTori

```ts
@Serializable()
class User {
  @JsonProperty('name')
  readonly username: string = ''

  @JsonProperty('age')
  readonly age: number = 0
}

const fetcher = new Fetcher()
const { data } = await fetcher.request({
  url: '/me',
  method: 'GET',
  type: User
})

data instanceof User  // true
data.username         // string
data.age              // number
```

## License

Apache-2.0
