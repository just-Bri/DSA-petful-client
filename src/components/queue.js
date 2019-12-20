class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  isEmpty() {
    if (this.first === null && this.last === null) {
      return true;
    }
  }

  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }

  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
  peek() {
    return this.first;
  }
  returnAsArray() {
    let currNode = this.first;
    while (currNode !== null) {
      currNode = currNode.next;
      return currNode.data;
    }
  }
}
module.exports = Queue;
