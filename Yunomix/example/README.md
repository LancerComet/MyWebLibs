# Yunomix Example

Here is an example shows how to use Yunomix.

```tsx
// Please ensure 'reflect-metadata' is imported in the entry.
import 'reflect-metadata'

import {
  Required, MinLength, MaxLength,
  IsEnglish, IsNumber, IsHexColor,
  getValidatorRules,
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

  @IsHexColor({ onlyUpperCase: false })
  color: string = '#000000'
}

const MyComponent = defineComponent({
  setup () {
    const userInputRef = ref(new User())
    const userRules = getValidatorRules(User)

    return () => {
      // For Vuetify.
      <VForm>
        <VTextfield label='Name' v-model={userInputRef.value.name} rules={userRules.name} />
        <VTextfield label='Age' v-model={userInputRef.value.age} rules={userRules.age} />
        <VTextfield label='Address' v-model={userInputRef.value.addr} rules={userRules.addr} />
        <VTextfield label='Hex color' v-model={userInputRef.value.color} rules={userRules.color} />
      </VForm>

      // For Lancet.
      <LctForm>
        <LctTextfield label='Name' v-model={userInputRef.value.name} rules={userRules.name} />
        <LctTextfield label='Age' v-model={userInputRef.value.age} rules={userRules.age} />
        <LctTextfield label='Address' v-model={userInputRef.value.addr} rules={userRules.addr} />
        <LctTextfield label='Hex color' v-model={userInputRef.value.color} rules={userRules.color} />
      </LctForm>
    }
  }
})

```
