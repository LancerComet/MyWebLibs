# @lancercomet/eslint-config-eslint-rules

This is my own ESLint config preset.

```
npm install @lancercomet/eslint-config-eslint-rules --save-dev
```

> Necessary dependencies are installed automatically.

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
