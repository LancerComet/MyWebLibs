# HTML Parser

[![MyWebLibs](https://github.com/LancerComet/MyWebLibs/workflows/Test/badge.svg)](https://github.com/LancerComet/MyWebLibs/actions)
[![npm version](https://badge.fury.io/js/@lancercomet%2Fhtml-parser.svg)](https://badge.fury.io/js/@lancercomet%2Fhtml-parser)

A html parser.

## Quick Start

Parse HTML:

```ts
import { parse } from '@lancercomet/html-parser'

const result = `
  <h1>John Smith</h1>
  <ul>
    <li>Age: 100</li>
    <li>Address: The Mars</li>
  </ul>
`

console.log(result)  // [ASTNode, ASTNode]
```

Create HTML element:

```ts
import { createElement } from '@lancercomet/html-parser'

const element = createElement(new ASTNode())
console.log(element)  // HTMLElement
```

## License

Apache-2.0
