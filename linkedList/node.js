module.exports = class Node {
  constructor() {
    this.next = null;
    this.value = null;
  }

  get getNext() { return this.next; }
  
  get getValue() { return this.value; }

  /**
   * @param {Node | null} node
   */
  set setNext(node) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';
    this.next = node;
  }

  /**
   * @param {string | number} value
   */
  set setValue(value) {
    if (isNaN(+value)) throw new 'Invalid input';

    this.value = +value;
  }
};
