const Node = require('./node');

module.exports = class BalancedBST {
  constructor(vector = []) {
    this.root = null;
    this.#generateArray(vector);
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

  #generateArray(vector = []) {
    this.array = [];
    if (!(vector instanceof Array)) throw new 'Invalid input';
    if (vector !== []) {
      // Sort vector
      vector.sort((a,b) => a - b);
      this.array = vector.filter((element, index) => {
        return vector.indexOf(element) === index;
      });
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

  #levelOrderIterative(node = this.root) {
    let nodes = [];
    let data = [];

    // When root is not empty
    if (node) nodes.push(node);

    // Iterates in breadth-first
    while (nodes.length) {
      // Get front from queue
      const front = nodes.shift();

      // Push data in data vector
      data.push(front.getData);

      if (front.getLeft) nodes.push(front.getLeft);
      if (front.getRight) nodes.push(front.getRight);
    }

    return data;
  }

  #levelOrderRecursive(node = this.root, data = [], level = 0) {
    if (!node) return;

    if (!level) data.push(node.getData);
    else {
      this.#levelOrderRecursive(node.getLeft, data, level - 1);
      this.#levelOrderRecursive(node.getRight, data, level - 1);
    }
  }

  // BFS traversal
  levelOrder(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return [];
    
    if (recursive) {
      let data = [];
      const height = this.height(node, true);
      for (let l = 0; l < height; ++l) this.#levelOrderRecursive(node, data, l);
      return data;
    } else {
      return this.#levelOrderIterative(node);
    }
  }

  // DFS traversal left -> root -> right
  #inOrderIterative(node = this.root) {
    let nodes = [];
    let current = node;
    let data = [];

    // Loop until current is null or stack is empty
    while (current || nodes.length) {
      // Push the current node and go deep left
      while (current) {
        nodes.push(current);
        current = current.getLeft;
      }

      // Get top from queue
      current = nodes.pop();
      
      // get root data first
      data.push(current.getData);

      // Go in right subtree
      current = current.getRight;
    }

    return data;
  }

  // DFS traversal root -> left -> right
  #preOrderIterative(node = this.root) {
    let nodes = [];
    let data = [];

    // When root is not empty
    if (node) nodes.push(node);

    // Iterates in depth-first
    while (nodes.length) {
      // Get back from queue
      const back = nodes.pop();
      
      // get root data first
      data.push(back.getData);

      // Push data in data vector
      if (back.getRight) nodes.push(back.getRight);
      if (back.getLeft) nodes.push(back.getLeft);
    }

    return data;
  }
  
  // DFS traversal left -> right -> root 
  #postOrderIterative(node = this.root) {
    let nodes = [];
    let data = [];

    // When root is not empty
    if (node) nodes.push(node);

    // Iterates in depth-first
    while (nodes.length) {
      // Get back from queue
      const back = nodes.pop();
      
      // get root data first
      data.push(back.getData);

      // Push data in data vector
      if (back.getLeft) nodes.push(back.getLeft);
      if (back.getRight) nodes.push(back.getRight);
    }

    return data.reverse();
  }
  
  #inOrderRecursive(node = this.root, data = []) {
    if (!node) return;

    this.#inOrderRecursive(node.getLeft, data);

    data.push(node.getData);

    this.#inOrderRecursive(node.getRight, data);
  }

  #preOrderRecursive(node = this.root, data = []) {
    if (!node) return;

    data.push(node.getData);

    this.#preOrderRecursive(node.getLeft, data);
    this.#preOrderRecursive(node.getRight, data);
  }

  #postOrderRecursive(node = this.root, data = []) {
    if (!node) return;

    this.#postOrderRecursive(node.getLeft, data);
    this.#postOrderRecursive(node.getRight, data);
    
    data.push(node.getData);
  }

  inOrder(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return [];
    
    if (recursive) {
      let data = [];
      this.#inOrderRecursive(node, data);
      return data;
    } else {
      return this.#inOrderIterative(node);
    }
  }

  preOrder(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return [];
    
    if (recursive) {
      let data = [];
      this.#preOrderRecursive(node, data);
      return data;
    } else {
      return this.#preOrderIterative(node);
    }
  }

  postOrder(node = this.root, recursive = false) {
    if (!(node instanceof Node) && (null !== node)) throw new 'Invalid input';

    if (!node) return [];
    
    if (recursive) {
      let data = [];
      this.#postOrderRecursive(node, data);
      return data;
    } else {
      return this.#postOrderIterative(node);
    }
  }

  #isBalancedIterative(node = this.root) {
    let nodes = [];

    if (!node) return true;

    nodes.push(node);

    // Iterates in breadth-first
    while (nodes.length) {
      // Get front from queue
      const front = nodes.shift();

      // Get height difference between left/rigth subtree of front
      const hDiff = Math.abs(this.height(front.getRight) - this.height(front.getLeft));
      
      // Is not balanced
      if (hDiff > 1) return false;

      // Push its children to stack
      if (front.getLeft) nodes.push(front.getLeft);
      if (front.getRight) nodes.push(front.getRight);
    }

    return true;
  }

  #isBalancedRecursive(node = this.root) {
    if (!node) return true;
    const hDiff = Math.abs(this.height(node.getRight, true) - this.height(node.getLeft, true));
    return hDiff <= 1
           && this.#isBalancedRecursive(node.getLeft)
           && this.#isBalancedRecursive(node.getRight);
  }

  isBalanced(recursive = false) {
    return recursive ? this.#isBalancedRecursive() : this.#isBalancedIterative();
  }

  rebalance() {
    // Already balanced
    if (this.isBalanced()) return;
    
    // DPS to get inorder vector
    this.#generateArray(this.inOrder());

    // Rebuild tree
    this.buildTree();
  }

  printTree() {
    // Pretty print
    this.#prettyPrint(this.root, '');
  }
};
