import { ASTNode } from '../lib/ast'
import { createElement, parse } from '../lib'

describe('HTML Parser test.', () => {
  const exampleAst = [
    new ASTNode({
      type: 'element',
      tagName: 'div',
      attributes: {
        class: 'test-div',
        'data-type': 'test'
      },
      children: [
        new ASTNode({
          type: 'text',
          text: 'This is a testing element.'
        }),
        new ASTNode({
          type: 'element',
          tagName: 'h2',
          children: [
            new ASTNode({ type: 'text', text: 'Title is here.' })
          ]
        }),
        new ASTNode({
          type: 'text',
          text: 'F@♂'
        }),
        new ASTNode({
          type: 'element',
          tagName: 'br',
          attributes: {
            class: 'this-is-a-br'
          }
        }),
        new ASTNode({
          type: 'element',
          tagName: 'input',
          attributes: {
            class: 'test-input',
            'data-value': 'none',
            type: 'text'
          }
        }),
        new ASTNode({
          type: 'element',
          tagName: 'hr'
        }),
        new ASTNode({
          type: 'text',
          text: 'F@♂'
        }),
        new ASTNode({
          type: 'element',
          tagName: 'p',
          attributes: {
            class: 'my-name',
            id: 'lancer'
          },
          children: [
            new ASTNode({
              type: 'element',
              tagName: 'div',
              attributes: {
                class: 'name-value'
              },
              children: [
                new ASTNode({
                  type: 'text',
                  text: 'LancerComet'
                })
              ]
            })
          ]
        })
      ]
    }),
    new ASTNode({
      type: 'element',
      tagName: 'h1',
      children: [
        new ASTNode({
          type: 'text',
          text: 'Greeting, LancerComet!'
        })
      ]
    })
  ]

  it('It should generate correct result.', () => {
    const html = `
      <div class="test-div" data-type="test">
        This is a testing element.
        <h2>Title is here.</h2>
        F@♂
        <br class="this-is-a-br"/>
        <input class="test-input" data-value="none" type="text"/>
        <hr/>
        F@♂
        <p class="my-name" id="lancer">
          <div class="name-value">LancerComet</div>
        </p>
      </div>
      <h1>Greeting, LancerComet!</h1>
    `
    const result = parse(html)
    expect(result).toEqual(exampleAst)
  })

  it('It should generate correct html elements.', () => {
    const element1 = createElement(exampleAst[0]) as Element
    const element2 = createElement(exampleAst[1]) as Element

    expect(element1.tagName.toLowerCase()).toBe('div')
    expect(element1.childNodes.length).toBe(8)
    expect((element1.childNodes[7] as Element).tagName.toLowerCase()).toBe('p')
    expect((element1.childNodes[7] as Element).children[0].textContent).toBe('LancerComet')

    expect(element2.tagName.toLowerCase()).toBe('h1')
    expect(element2.textContent).toBe('Greeting, LancerComet!')
  })
})
