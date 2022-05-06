import { ASTNode } from './ast'

/**
 * Create html element from AST node.
 *
 * @param astNode
 * @param parentElement
 */
const createElement = (astNode: ASTNode, parentElement?: Element): Element | Text => {
  let element: Element | Text

  switch (astNode.type) {
    case 'text':
      element = document.createTextNode(astNode.text)
      parentElement && parentElement.appendChild(element)
      break

    case 'element':
      element = document.createElement(astNode.tagName)
      // Set attributes.
      for (const attrName in astNode.attributes) {
        element.setAttribute(attrName, astNode.attributes[attrName])
      }

      parentElement && parentElement.appendChild(element)

      if (astNode.children.length) {
        for (let i = 0, length = astNode.children.length; i < length; i++) {
          const childAst = astNode.children[i]
          createElement(childAst, element)
        }
      }
      break
  }

  return element
}

export {
  createElement
}
