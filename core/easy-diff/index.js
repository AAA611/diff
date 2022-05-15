import Collector from '../Collector/index.js'
import { isSameNode } from '../../utils/index.js'

const collecter = new Collector()

function diff(oldVNode, newVNode) {
  if (isSameNode(oldVNode, newVNode)) {
    diffChildren(oldVNode, newVNode)
  }
}

function diffChildren(oldVNode, newVNode) {
  if (Array.isArray(newVNode.children)) {
    const oldChildren = oldVNode.children
    const newChildren = newVNode.children

    let lastIndex = 0
    for (let i = 0; i < newChildren.length; i++) {
      const newNode = newChildren[i]
      let find = false
      for (let j = 0; j < oldChildren.length; j++) {
        const oldNode = oldChildren[j]
        if (newNode.key === oldNode.key) {
          find = true
          diff(oldNode, newNode)
          if (j < lastIndex) {
            const preNewNode = newChildren[i - 1]
            if (preNewNode) {
              collecter.collect('move', {
                type: 'move',
                node: newNode.text,
                preNode: preNewNode,
              })
            }
          } else {
            lastIndex = j
          }
          break
        }
      }

      if (!find) {
        const preNewNode = newChildren[i - 1]
        if (preNewNode) {
          collecter.collect('insert', {
            type: 'insert',
            preNode: preNewNode,
          })
        } else {
          collecter.collect('insert', {
            type: 'insert',
            preNode: 'this is fisrt node!',
          })
        }
      }
    }
  }
}

export default diff

let old = {
  type: 'div',
  children: [
    {
      type: 'p1',
      key: '1',
      text: '1',
    },
    {
      type: 'p1',
      key: '2',
      text: '2',
    },
    {
      type: 'p1',
      key: '3',
      text: '3',
    },
  ],
}

let newV = {
  type: 'div',
  children: [
    {
      type: 'p1',
      key: '3',
      text: '3',
    },
    {
      type: 'p1',
      key: '1',
      text: '1',
    },
    {
      type: 'p1',
      key: '2',
      text: '2',
    },
  ],
}

diffChildren(old, newV)

collecter.print()
