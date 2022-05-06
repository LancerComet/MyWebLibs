type NodeType = 'element' | 'text' | 'unknown'

class ASTNode {
  readonly attributes: Record<string, string> = {}
  readonly children: ASTNode[] = []
  readonly tagName: string = ''
  readonly type: NodeType = 'element'
  readonly text: string = ''

  constructor (params: {
    type: NodeType
    tagName?: string
    attributes?: Record<string, string>
    text?: string
    children?: ASTNode[]
  }) {
    this.attributes = params.attributes || {}
    this.tagName = params.tagName || ''
    this.type = params.type || 'unknown'
    this.text = params.text || ''
    this.children = params.children || []
  }
}

export {
  ASTNode
}
