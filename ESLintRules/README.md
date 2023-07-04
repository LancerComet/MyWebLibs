# @lancercomet/eslint-config-eslint-rules

This is my own ESLint config preset.

You have to use it with `typescript-eslint` and `eslint-plugin-import`.

```
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import @lancercomet/eslint-config-eslint-rules --save-dev
```


```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: [
    'standard',
    '@lancercomet/eslint-rules',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],

  parser: '@typescript-eslint/parser'
}

```