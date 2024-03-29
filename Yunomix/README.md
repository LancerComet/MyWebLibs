# Yunomix

[![MyWebLibs](https://github.com/LancerComet/MyWebLibs/workflows/Test/badge.svg)](https://github.com/LancerComet/MyWebLibs/actions)
[![npm version](https://badge.fury.io/js/@lancercomet%2Fyunomix.svg)](https://badge.fury.io/js/@lancercomet%2Fyunomix)

Yunomix is a validation toolkit which is designed for TypeScript users in AOP form.

## Features

 - Set rules by using @Decorator.
 - Works with [Vuetify](https://github.com/vuetifyjs/vuetify) and [Lancet](https://github.com/LancerComet/Lancet).
 - For TypeScript users.

## Quick start

```ts
// Please make sure "reflect-metadata" is imported at your project entry.
import 'reflect-metadata'
```

```ts
import {
  Required, IsString, IsEnglish, IsNumber, IsHexColor,
  getValidatorRules
} from '@lancercomet/yunomix'

class User {
  @Required()
  @IsString(1, 10, {
    invalidType: 'Name length must within 1-10.'
  })
  @IsEnglish()
  name: string = ''

  @IsNumber('Age must be a number.')
  age: number = 0

  @IsString(5)
  addr: string = ''

  @IsHexColor()
  color: string = '#4fc315'
}

const rules = getValidatorRules(User)
const userInput = new User()
```

In Vuetify:

```html
<v-text-field v-model="userInput.name" :rules="rules.name" />
<v-text-field v-model.number="userInput.age" :rules="rules.age" />
<v-text-field v-model="userInput.addr" :rules="rules.age" />
<v-text-field v-model="userInput.color" :rules="rules.color" />
```

In Lancet:

```html
<lct-textfield v-model="userInput.name" :rules="rules.name" />
<lct-textfield v-model.number="userInput.age" :rules="rules.age" />
<lct-textfield v-model="userInput.addr" :rules="rules.age" />
<lct-textfield v-model="userInput.color" :rules="rules.color" />
```

Without any UI framework:

```ts
// Import "validate".
import { validate } from '@lancercomet/yunomix'

class User {
  ...
}

const rules = getValidatorRules(User)
const userInput = new User()

// A true or a string will be returned.
// A true means it passed validation.
// A string means it didn't. This string is used as its error message.
const isNameValid = validate(userInput.name, rules.name)  // true | string
```

## Validator list

 - IsArray
 - IsBoolean
 - IsChinese
 - IsEmail
 - IsEnglish
 - IsHexColor
 - IsHttpUrl
 - IsNumber
 - IsString
 - MatchValue
 - NumRange
 - Required
 - CustomRule

## Custom Rule

You can use `CustomRule` to create a customized validator:

```ts
// It accepts multiple validating functions.
@CustomRule(
  v => typeof v === 'string' || 'Value must be a string',
  v => v.includes('John') || 'Value must contain a "John".'
)
```

Example:

```tsx
class User {
  // "v" is something that user gives.
  @CustomRule(v => v === 'Kayne' || 'You must be Kayne!')
  name: string = ''
}

const input = new User()
const rules = getValidatorRules(User)

<Vtext-field v-model={input.name} rules={rules.user}>  // user.name can only be 'Kayne'.
```

`CustomRule` accepts one / several function(s) like `(value: unknown) => true | string`.

The returned value:

 - `true`: Indicates that the value that user provides is valid.
 - a `string`: Indicates that the value that user provides is invalid and this returned string will be used as the warning message.

## Error message

Yunomix accepts both a `string` and a function as its error message:

```ts
class User {
  @Required('It should not be empty.')
  @IsString(() => {
    return window.navigator.language.includes('zh')
      ? '此项必须是一个字符串.'
      : 'This field should be a string.'
  })
  something: unknown = undefined
}
```

Both are OK. Function is very useful for i18n.

## Example

Please check the `example` folder.

## Something you might to know

Yunomix depends on the very feature `emitDecoratorMetadata` which was introduced in TypeScript, so keep in mind:

- You have to install and import `reflect-metadata` manually.
- Not available in pure JavaScript enviroment. You have to use it with TypeScript.
- Not available for ESBuild because ESBuild doesn't emit decorator metadata.


## License

Apache-2.0
