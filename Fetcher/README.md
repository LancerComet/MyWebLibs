# Fetcher

Yet another fetcher.

## Quick start

```ts
import { Fetcher } from '@lancercomet/fetcher'

const fetcher = new Fetcher()

const { data, error } = await fetcher.requestJSON({
  url: '/me',
  method: 'GET'
})
```

## Abort a request

```tsx
import { Fetcher } from '@lancercomet/fetcher'

const fetcher = new Fetcher()

const sendRequest = async () => {
  const { data, error } = await fetcher.requestJSON({
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
const { data } = await fetcher.requestJSON({
  url: '/me',
  method: 'GET',
  type: User
})

data instanceof User  // true
data.username         // string
data.age              // number
```

## Request Binary

```ts
// ArrayBuffer.
const { data: buffer, error } = await fetcher.requestBinary({
  url: '/binary'
}, 'arraybuffer')

// Blob.
const { data: blob, error } = await fetcher.requestBinary({
  url: '/binary'
}, 'blob') 
```

## Request the API

"The API" is a type of data structure which would be like:

```json
{
  "data": ...,
  "code": 0,
  "message": "OK"
}
```

```ts
const { data, error, message, code, status } = await fetcher.requestAPI({
  ...
})
```

## License

Apache-2.0
