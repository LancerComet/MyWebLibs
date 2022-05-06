const parseElementStr = (str: string) => {
  if (!str) {
    throw new Error('[Parse Element Attr] Please provide valid html string.')
  }

  const words = str.split(' ')
  let isSelfClosed = false

  // Check and deal-with self-closed.
  for (let i = 0, length = words.length; i < length; i++) {
    if (/\/$/.test(words[i])) {
      isSelfClosed = true
      words[i] = words[i].replace('/', '')
    }
  }

  const tagName = words.shift()
  const attributes: Record<string, string> = {}

  for (let i = 0, length = words.length; i < length; i++) {
    const item = words[i]
    const _words = item.split('=')
    const attrName = _words[0]
    const attrValue = _words[1].replace(/(["'])/g, '') // Remove " and ' in attribute value.
    attributes[attrName] = attrValue
  }

  return {
    tagName,
    attributes,
    isSelfClosed
  }
}
export {
  parseElementStr
}
