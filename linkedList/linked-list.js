const Node = require('./node');

module.exports = class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
  }

  append (value) {
    const node = new Node();
    node.setValue = value;

    // Empty list
    if (this.headNode === null) {
      this.headNode = node;
      this.tailNode = node;
    } else {
      this.tailNode.setNext = node;
      this.tailNode = node;
    }
  }

  prepend (value) {
    const node = new Node();
    node.setValue = value;

    // Empty list
    if (this.headNode === null) {
      this.headNode = node;
      this.tailNode = node;
    } else {
      node.setNext = this.headNode;
      this.headNode = node;
    }
  }

  size() {
    let length = 0;
    let node = this.headNode;

    while(null !== node) {
      length++;
      node = node.getNext;
    }

    return length;
  }

  head() {
    return this.headNode;
  }

  tail() {
    return this.tailNode;
  }

  at(index) {
    let node = this.headNode;
    const locIndex = +index;
    let idx = 0;

    if (isNaN(locIndex)) return null;
    
    if (locIndex < 0) return null;

    while(null !== node) {
      if (idx === locIndex) return node;
      node = node.getNext;
      idx++;
    }

    return null;
  }

  pop() {
    let node = this.headNode;
    const tail = this.tailNode;

    if (tail === null) return;

    if (tail === node) {
      this.tailNode = null;
      this.headNode = null;
      return;
    }

    while (null !== node) {
      if (tail === node.getNext) {
        this.tailNode = node;
        node.setNext = null;
      }
      node = node.getNext;
    }
  }

  contains(value) {
    return null !== this.find(value);
  }

  find(value) {
    let node = this.headNode;
    const locValue = +value;

    if (isNaN(locValue)) return null;
    
    while(null !== node) {
      if (locValue === node.getValue) return node;
      node = node.getNext;
    }

    return null;
  }

  toString() {
    let llToString = '';
    let node = this.headNode;

    while(null !== node) {
      llToString += '( ' + node.getValue + ' ) -> ';
      node = node.getNext;
    }

    llToString += 'null';

    return llToString;
  }

  insertAt(value, index = 0) {
    const locIndex = +index;

    // Invalid index
    if (isNaN(locIndex) || (locIndex < 0)) return;
    
    if (locIndex === 0) {
      this.prepend(value);
      return;
    }

    // Get previous node
    const prevNode = this.at(locIndex - 1);

    // Append when overflow or previous is the last element
    if ((prevNode === null) || (prevNode === this.tailNode)) {
      this.append(value);
    } else { // Set up new links
      const node = new Node();
      node.setValue = value;
      node.setNext = prevNode.getNext;
      prevNode.setNext = node;
    }
  }

  removeAt(index = 0) {
    let idx = 0;
    let node = this.headNode;
    const locIndex = +index;

    // Invalid index or empty list
    if (isNaN(locIndex) || (locIndex < 0) || (this.headNode === null)) return;
    
    // Remove last element
    if (this.headNode === this.tailNode) {
      this.headNode = null;
      this.tailNode = null;
      return;
    }

    if (locIndex === 0) {
      this.headNode = node.getNext;
      return;
    }

    // Loop on every node
    while (null !== node) {
      // Find index or last element (overflow)
      if (((idx + 1) === locIndex) || (this.tailNode === node.getNext)) {
        if (node.getNext === this.tailNode) {
          this.tailNode = node;
          node.setNext = null;
        } else {
          node.setNext = node.getNext.getNext;
        }
        break;
      }
      node = node.getNext;
      idx++;
    }
  }
};
