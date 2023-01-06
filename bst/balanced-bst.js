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

  #prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      if (this.root === node) console.log(`${prefix} │── empty tree`);
      return;
    }

    if (node.right !== null) {
      this.#prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    if (this.root === node) console.log(`${prefix} │── ${node.data}`);
    else console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      this.#prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  #sortedArrayToBST(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node();
    // Set BST data
    root.setData = this.array[mid];
    // Set children recursively
    root.setLeft = this.#sortedArrayToBST(start, mid - 1);
    root.setRight = this.#sortedArrayToBST(mid + 1, end);
    
    return root;
  }

  buildTree() {
    this.root = this.#sortedArrayToBST(0, this.array.length - 1);
  }

  #insertIterative(value, node = this.root) {
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

  #insertRecursive(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.getData) node.setLeft = this.#insertRecursive(value, node.getLeft);
    else if (value > node.getData) node.setRight = this.#insertRecursive(value, node.getRight);
    return node;
  }

  insert(value, recursive = false) {
    const data = +value;

    // Invalid data
    if (isNaN(data)) throw new 'Invalid input';

    this.root = recursive ? this.#insertRecursive(data) : this.#insertIterative(data);
  }

  #minValueNode(node) {
    let minNode = {
      parent: null,
      current: node
    };

    if (node) {
      while(minNode.current.getLeft) {
        minNode.parent = minNode.current;
        minNode.current = minNode.current.getLeft;
      }
    }

    return minNode;
  }

  #deleteIterative(data, root = this.root) {
    let prev;
    let temp = root;

    // Search node to insert in BST
    while(temp) {
      // key data is in left subtree 
      if (temp.getData > data) {
        prev = temp;
        temp = prev.getLeft;
      } else if (temp.getData < data) { // key data is in right subtree
        prev = temp;
        temp = temp.getRight;
      } else {
        break;
      }
    }

    // Empty tree or key not found
    if (!temp) return root;
    
    // Node has only one child
    if (!temp.getLeft || !temp.getRight) {
      // Substitute temp with the new node
      const newNode = temp.getLeft ? temp.getLeft : temp.getRight;

      // Data is in the root
      if (!prev) return newNode;

      // Link father with new node
      if (prev.getLeft === temp) prev.setLeft = newNode;
      else prev.setRight = newNode;
    } else {
      // Has both children
      const minNode = this.#minValueNode(temp.getRight);

      // Check the inorder successor's parent
      if (minNode.parent) {
        minNode.parent.setLeft = minNode.current.getRight;
      } else {
        temp.setRight = minNode.current.getRight;
      }

      // Set data inorder successor's content to this node
      temp.setData = minNode.current.getData;
    }

    return root;
  }

  #deleteRecursive(data, root = this.root) {
    // Empty tree
    if (!root) return null;

    // Data to delete is in the left subtree 
    if (data < root.getData) {
      root.setLeft = this.#deleteRecursive(data, root.getLeft);
    }

    // Data to delete is in the right subtree
    else if (data > root.getData) {
      root.setRight = this.#deleteRecursive(data, root.getRight);
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
      const minNode = this.#minValueNode(root.getRight);
      
      // Set data inorder successor's content to this node
      root.setData = minNode.current.getData;
      
      // Delete the inorder successor
      root.setRight = this.#deleteRecursive(minNode.current.getData, root.getRight);
    }
    
    return root;
  }

  delete(value, recursive = false) {
    const data = +value;

    // Invalid data
    if (isNaN(data)) throw new 'Invalid input';

    this.root = recursive ? this.#deleteRecursive(data) : this.#deleteIterative(data);
  }

  #findIterative(value, node = this.root) {
    let temp = node;
  
    while(temp) {
      if (temp.getData === value) return temp;
      else if (temp.getData > value) temp = temp.getLeft;
      else temp = temp.getRight;
    }

    return null;
  }

  #findRecursive(value, node = this.root) {
    if (!node || node.getData === value) return node;
    else if (node.getData > value) return this.#findRecursive(value, node.getLeft);
    else return this.#findRecursive(value, node.getRight);
  }

  find(value, recursive = false) {
    const data = +value;

    // Invalid data
    if (isNaN(data)) throw new 'Invalid input';
    
    return recursive ? this.#findRecursive(value) : this.#findIterative(value);
  }

  #heightIterative(node = this.root) {
    let height = 0;
    let nodeCount = 0;
    let nodes = [];

    // Empty subtree height is zero
    if (!node) return 0;

    // Add node to queue
    nodes.push(node);

    while (nodes.length) {
      // Get the number of nodes
      nodeCount = nodes.length;

      // Add level in tree
      height++;

      // Loop on current nodes in list and fetch children
      while (nodeCount) {
        // Get the front of the queue (FIFO) from the temporary nodes
        const temp = nodes.shift();

        // Get its subtrees
        if (temp.getLeft) nodes.push(temp.getLeft);
        if (temp.getRight) nodes.push(temp.getRight);

        // Decrese node count
        nodeCount--;
      }
    }

    return height;
  }

  #heightRecursive(node = this.root) {
    if (!node) return 0;

    const heightLeft = this.#heightRecursive(node.getLeft);
    const heightRight = this.#heightRecursive(node.getRight);

    return Math.max(heightLeft, heightRight) + 1;
  }

  height(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return 0;

    return recursive ? this.#heightRecursive(node) : this.#heightIterative(node);
  }

  #depthIterative(node = this.root) {
    let current = this.root;
    let depthValue = 0;

    while(node && current) {
      if (current === node) return depthValue;
      else if (current.getData > node.getData) {
        current = current.getLeft;
      } else {
        current = current.getRight;
      }
      depthValue++;
    }

    return depthValue;
  }

  #depthRecursive(current = this.root, node = this.root) {
    if (!node || !current || current === node) return 0;
    else if (current.getData > node.getData) return this.#depthRecursive(current.getLeft, node) + 1;
    else return this.#depthRecursive(current.getRight, node) + 1;
  }

  depth(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return 0;

    return recursive ? this.#depthRecursive(node) : this.#depthIterative(node);
  }

  printTree() {
    // Pretty print
    this.#prettyPrint(this.root, '');
  }
};
