export function isSameNode(node1, node2) {
  return node1.type === node2.type && node1.key === node2.key
}
