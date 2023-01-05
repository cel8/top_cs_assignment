const Node = require('./node');

module.exports = class BalancedBST {
  constructor(vector = []) {
    this.root = null;
    this.array = [];
    if (!(vector instanceof Array)) throw new 'Invalid input';
    // if (vector === []) throw new 'Invalid empty vector';
    if (vector !== []) {
      // Sort vector
      vector.sort((a,b) => a - b);
      this.array = vector.filter((element, index) => {
        return vector.indexOf(element) === index;
      });
    }
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      if (this.root === node) console.log(`${prefix} │── empty tree`);
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    if (this.root === node) console.log(`${prefix} │── ${node.data}`);
    else console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  sortedArrayToBST(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node();
    // Set BST data
    root.setData = this.array[mid];
    // Set children recursively
    root.setLeft = this.sortedArrayToBST(start, mid - 1);
    root.setRight = this.sortedArrayToBST(mid + 1, end);
    
    return root;
  }

  buildTree() {
    this.root = this.sortedArrayToBST(0, this.array.length - 1);
  }

  insertIterative(value, node = this.root) {
    let prev;
    let temp = node;
    const newNode = new Node(value);

    // Check root
    if (!temp) {
      return newNode;
    }

    // Search node to insert in BST
    while(temp) {
      // key value is in left subtree 
      if (temp.getData > value) {
        prev = temp;
        temp = prev.getLeft;
      } else if (temp.getData < value) { // key value is in right subtree
        prev = temp;
        temp = temp.getRight;
      } else {
        // Do not insert the same key (exclude duplicates)
        return node;
      }
    }

    // Left subtree
    if (prev.getData > value) {
      prev.setLeft = newNode;
    } else {
      prev.setRight = newNode;
    }

    return node;
  }

  insertRecursive(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.getData) node.setLeft = this.insertRecursive(value, node.getLeft);
    else if (value > node.getData) node.setRight = this.insertRecursive(value, node.getRight);
    return node;
  }

  insert(value, recursive = false) {
    this.root = recursive ? this.insertRecursive(value) : this.insertIterative(value);
  }

  minValueNode(node) {
    let current = node;

    while(current && current.getLeft) {
      current = current.getLeft;
    }

    return current;
  }

  deleteNode(data, root = this.root) {
    // Empty tree
    if (!root) return null;

    // Data to delete is in the left subtree 
    if (data < root.getData) {
      root.setLeft = this.deleteNode(data, root.getLeft);
    }

    // Data to delete is in the right subtree
    else if (data > root.getData) {
      root.setRight = this.deleteNode(data, root.getRight);
    }

    // Data is the root
    else {
      // Leaf node
      if (root.getLeft === null && root.getRight === null) {
        return null;
      }

      // One child subtree (left subtree)
      if (root.getRight === null) {
        return root.getLeft;
      }

      // One child subtree (right subtree)
      if (root.getLeft === null) {
        return root.getRight;
      }

      // Get min node
      const minNode = this.minValueNode(root.getRight);
      
      // Set data inorder successor's content to this node
      root.setData = minNode.getData;
      
      // Delete the inorder successor
      root.setRight = this.deleteNode(root.getRight, minNode.getData);
    }
    
    return root;
  }

  delete(value) {
    const data = +value;

    // Invalid data
    if (isNaN(data)) return;

    this.root = this.deleteNode(data);
  }

  findIterative(value, node = this.root) {
    let temp = node;
  
    while(temp) {
      if (temp.getData === value) return temp;
      else if (temp.getData > value) temp = temp.getLeft;
      else temp = temp.getRight;
    }

    return null;
  }

  findRecursive(value, node = this.root) {
    if (!node || node.getData === value) return node;
    else if (node.getData > value) return this.findRecursive(value, node.getLeft);
    else return this.findRecursive(value, node.getRight);
  }

  find(value, recursive = false) {
    const data = +value;

    // Invalid data
    if (isNaN(data)) throw new 'Invalid input';
    
    return recursive ? this.findRecursive(value) : this.findIterative(value);
  }

  height(node) {
    if (!node) return 0;

    const heightLeft = this.height(node.getLeft) + 1;
    const heightRight = this.height(node.getRight) + 1;

    return Math.max(heightLeft, heightRight);
  }

  depth(node) {
    let temp = this.root;
    let depthValue = 0;

    if (!(node instanceof Node) && (null !== node)) return 0;

    while(node && temp) {
      if (temp === node) return depthValue;
      else if (temp.getData > node.getData) {
        temp = temp.getLeft;
      } else {
        temp = temp.getRight;
      }
      depthValue++;
    }

    return depthValue;
  }

  printTree() {
    // Pretty print
    this.prettyPrint(this.root, '');
  }
};
