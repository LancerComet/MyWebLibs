import { ASTNode } from './ast'
import { parseElementStr } from './parser'

const tokenize = (htmlString = ''): ASTNode[] => {
  if (!htmlString) {
    throw new Error('[Tokenizer] Please provide valid html string.')
  }

  const result: ASTNode[] = []
  const tokens = htmlString
    .split(/([<>])/)
    .filter(item => item !== '')

  const scopeStack: ASTNode[] = []

  while (tokens.length) {
    const currentToken = tokens.shift()

    if (currentToken === '<') {
      const htmlElementStr = tokens.shift()

      // Closing tag.
      if (htmlElementStr.indexOf('/') === 0) {
        scopeStack.pop()
        continue
      }

      // Get attributes and tag name
      const { attributes, tagName, isSelfClosed } = parseElementStr(htmlElementStr)

      // Create new element.
      const newElement = new ASTNode({
        tagName,
        attributes,
        type: 'element'
      })

      // Find parent element.
      if (scopeStack.length) {
        const parentElement = scopeStack[scopeStack.length - 1]
        parentElement.children.push(newElement)
      } else {
        result.push(newElement)
      }

      !isSelfClosed && scopeStack.push(newElement)
      continue
    }

    if (currentToken === '>') {
      // Do nothing here.
      continue
    }

    // textContent.
    const textContent = currentToken.trim()

    // Vaild textContent.
    if (/^\S+/.test(textContent)) {
    // Push to children.
      const target = scopeStack[scopeStack.length - 1]
      target.children.push(new ASTNode({
        type: 'text',
        text: textContent
      }))
    }
  }

  return result
}

export {
  tokenize
}
