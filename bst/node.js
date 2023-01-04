module.exports = class Node {
  constructor() {
    this.data = null;
    this.left = null;
    this.right = null;
  }

  get getLeft() { return this.left; }

  get getRight() { return this.right; }
  
  get getData() { return this.data; }

  /**
   * @param {Node | null} node
   */
  set setLeft(node) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';
    this.left = node;
  }

  /**
   * @param {Node | null} node
   */
   set setRight(node) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';
    this.right = node;
  }

  /**
   * @param {string | number} data
   */
  set setData(data) {
    if (isNaN(+data)) throw new 'Invalid input';

    this.data = +data;
  }
};
