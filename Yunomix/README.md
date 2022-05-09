# Yunomix

[![MyWebLibs](https://github.com/LancerComet/MyWebLibs/workflows/Test/badge.svg)](https://github.com/LancerComet/MyWebLibs/actions)
[![npm version](https://badge.fury.io/js/@lancercomet%2Fyunomix.svg)](https://badge.fury.io/js/@lancercomet%2Fyunomix)

This is a set of validators that are designed for Vuetify and Lancet in @Decorator form.

## Quick start

```ts
// Please make sure "reflect-metadata" is imported at your project entry.
import 'reflect-metadata'
```

```ts
import {
  Required, MinLength, MaxLength,
  IsEnglish, IsNumber, IsHexColor,
  getValidatorRules
} from '@lancercomet/yunomix'

class User {
  @Required()
  @MaxLength(10, 'Name cannot be longer than 10.')
  @IsEnglish('Name must be English.')
  name: string = ''

  @IsNumber('Age must be a number.')
  age: number = 0

  @MinLength(5)
  addr: string = ''

  @IsHexColor()
  color: string = '#4fc315'
}

const rules = getValidatorRules(User)
const userInput = new User()
```

In Vuetify:

```html
<v-textfield v-model="userInput.name" :rules="rules.name" />
<v-textfield v-model.number="userInput.age" :rules="rules.age" />
<v-textfield v-model="userInput.addr" :rules="rules.age" />
<v-textfield v-model="userInput.color" :rules="rules.color" />
```

In Lancet:

```html
<lct-textfield v-model="userInput.name" :rules="rules.name" />
<lct-textfield v-model.number="userInput.age" :rules="rules.age" />
<lct-textfield v-model="userInput.addr" :rules="rules.age" />
<lct-textfield v-model="userInput.color" :rules="rules.color" />
```

## Example

Please check the `example` folder.

## Something you might to know

Yunomix depends on the very feature `emitDecoratorMetadata` which was introduced in TypeScript, so keep in mind:

- You have to install and import `reflect-metadata` manually.
- Not available in pure JavaScript enviroment. You have to use it with TypeScript.
- Not available for ESBuild because ESBuild doesn't emit decorator metadata.


## License

Apache-2.0
