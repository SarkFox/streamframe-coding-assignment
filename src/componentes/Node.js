//Node class used as a N-ARY Tree data structure

export default class Node {
  constructor(data) {
    this.data = data
    this.children = []
  }
  add(data) {
    this.children.push(new Node(data))
  }
  remove(data) {
    this.children = this.children.filter(node => node.data !== data)
  }

}
