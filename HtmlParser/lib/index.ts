import { tokenize } from './tokenize'
import { createElement } from './element'

/**
 * Parse html into AST Node.
 *
 * @param htmlString
 */
const parse = (htmlString: string) => {
  return tokenize(htmlString)
}

export {
  parse,
  createElement
}
