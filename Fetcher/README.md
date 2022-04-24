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
