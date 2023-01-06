const BalancedBST = require('./balanced-bst');
const Node = require('./node');

const mockBST = {
  bst0: function() {
    const tree = new BalancedBST([]);
    tree.array = [];
    tree.root = null;
    return tree;
  },
  bst1: function() {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.root = new Node(2);
    tree.root.left = new Node(1);
    tree.root.right = new Node(3);
    tree.root.right.right = new Node(4);
    return tree;
  },
  bst2: function() {
    const tree = new BalancedBST([]);
    tree.array = [ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ];
    tree.root = new Node(8);
    tree.root.left = new Node(4);
    tree.root.left.left = new Node(1);
    tree.root.left.left.right = new Node(3);
    tree.root.left.right = new Node(5);
    tree.root.left.right.right = new Node(7);
    tree.root.right = new Node(67);
    tree.root.right.left = new Node(9);
    tree.root.right.left.right = new Node(23);
    tree.root.right.right = new Node(324);
    tree.root.right.right.right = new Node(6345);
    return tree;
  },
  bst3: function() {
    const tree = this.bst1();
    tree.root.right.right.right = new Node(5);
    return tree;
  },
  bst4: function() {
    const tree = this.bst3();
    tree.root.right.right.right.right = new Node(15);
    return tree;
  },
  bst5: function() {
    const tree = this.bst1();
    tree.root.right.right.right = new Node(15);
    return tree;
  },
  bst6: function() {
    const tree = this.bst4();
    tree.root.left.left = new Node(-1);
    tree.root.left.left.left = new Node(-4);
    return tree;
  },
  bst7: function() {
    const tree = this.bst4();
    tree.root.left.left = new Node(-4);
    return tree;
  },
  bst8: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.left = new Node(16);
    tree.root.right.right = new Node(25);
    return tree;
  },
  bst9: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(16);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.right = new Node(25);
    return tree;
  },
  bst10: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.left = new Node(16);
    tree.root.right.left.right = new Node(17);
    tree.root.right.left.right.right = new Node(18);
    tree.root.right.right = new Node(25);
    return tree;
  },
  bst11: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(16);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.left = new Node(17);
    tree.root.right.left.right = new Node(18);
    tree.root.right.right = new Node(25);
    return tree;
  },
  bst12: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(1);
    return tree;
  },
  bst13: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(2);
    return tree;
  },
  bst14: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(1);
    tree.root.right = new Node(2);
    return tree;
  },
  bst15: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.left = new Node(16);
    tree.root.right.right = new Node(25);
    return tree;
  },
  bst16: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(25);
    tree.root.right.left = new Node(16);
    return tree;
  },
  bst17: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(20);
    tree.root.right.left = new Node(16);
    tree.root.right.left.right = new Node(17);
    tree.root.right.left.right.right = new Node(18);
    tree.root.right.right = new Node(25);
    tree.root.right.right.right = new Node(28);
    return tree;
  },
  bst18: function() {
    const tree = new BalancedBST();
    tree.array = [];
    tree.root = new Node(15);
    tree.root.left = new Node(10);
    tree.root.left.left = new Node(8);
    tree.root.left.right = new Node(12);
    tree.root.right = new Node(25);
    tree.root.right.left = new Node(16);
    tree.root.right.left.right = new Node(17);
    tree.root.right.left.right.right = new Node(18);
    tree.root.right.right = new Node(28);
    return tree;
  },
}

describe('Node', () => {
  test('set valid value (number)', () => {
    const node = new Node();
    node.setData = 1;
    expect(node.getData).toEqual(1);
  });

  test('set valid value (string number)', () => {
    const node = new Node();
    node.setData = '1';
    expect(node.getData).toEqual(1);
  });

  test('set invalid value (string)', () => {
    const node = new Node();
    expect(() => {
      node.setData = 'ciao';
    }).toThrow('Invalid input');
  });

  test('set invalid value (Array)', () => {
    const node = new Node();
    expect(() => {
      node.setData = [ 1, 2, 3 ];
    }).toThrow('Invalid input');
  });

  test('set valid default value (null) constructor', () => {
    const node = new Node();
    expect(node.getData).toEqual(null);
  });

  test('set valid value (number) constructor', () => {
    const node = new Node(1);
    expect(node.getData).toEqual(1);
  });

  test('set valid value (string number) constructor', () => {
    const node = new Node('1');
    expect(node.getData).toEqual(1);
  });

  test('set invalid value (string) constructor', () => {
    expect(() => {
      const node = new Node('ciao');
    }).toThrow('Invalid input');
  });

  test('set invalid value (Array) constructor', () => {
    expect(() => {
      const node = new Node([ 1, 2, 3 ]);
    }).toThrow('Invalid input');
  });

  test('set valid left/right (node)', () => {
    const node1 = new Node(1);
    const node2 = new Node(2);
    const node3 = new Node(3);
    node1.setLeft = node2;
    node1.setRight = node3;

    expect(node1.getLeft).toEqual(node2);
    expect(node1.getRight).toEqual(node3);
  });

  test('set valid left/right (node)', () => {
    const node = new Node();
    node.setValue = 1;
    node.setLeft = null;
    node.setRight = null;

    expect(node.getLeft).toEqual(null);
    expect(node.getRight).toEqual(null);
  });

  test('set invalid left (string)', () => {
    const node = new Node();
    expect(() => {
      node.setLeft = 'ciao';
    }).toThrow('Invalid input');
  });

  test('set invalid right (Array)', () => {
    const node = new Node();
    expect(() => {
      node.setRight = [ 1, 2, 3 ];
    }).toThrow('Invalid input');
  });
});

describe('BalancedBST', () => {
  test('Invalid BST constructor', () => {
    expect(() => {
      const tree = new BalancedBST(null);
    }).toThrow('Invalid input');
  });
  test('Build a BST from vector#0 (empty)', () => {
    const tree = new BalancedBST();
    tree.buildTree();
    expect(tree).toEqual(mockBST.bst0());
  });
  test('Build a BST from vector#1 (ordered with no duplicates)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Build a BST from vector#2 (unordered with duplicates)', () => {
    const tree = new BalancedBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    tree.buildTree();
    expect(tree).toEqual(mockBST.bst2());
  });
  test('Insert two valid elements', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    expect(tree).toEqual(mockBST.bst4());
  });
  test('Invalid insert', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.insert('ciao');
    }).toThrow('Invalid input');
  });
  test('Insert same value (root)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(2);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Insert same value (node)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(3);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Insert same value (leaf)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(1);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Insert two valid elements (recursive)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5, true);
    tree.insert(15, true);
    expect(tree).toEqual(mockBST.bst4());
  });
  test('Invalid insert (recursive)', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.insert('ciao', true);
    }).toThrow('Invalid input');
  });
  test('Insert same value (root) (recursive)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(2, true);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Insert same value (node) (recursive)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(3, true);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Insert same value (leaf) (recursive)', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(1, true);
    expect(tree).toEqual(mockBST.bst1());
  });
  test('Invalid delete', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.delete('ciao');
    }).toThrow('Invalid input');
  });
  test('Delete root which is a leaf', () => {
    const tree = mockBST.bst12();
    tree.delete(1);
    expect(tree).toEqual(mockBST.bst0());
  });
  test('Delete root with a leaf', () => {
    const tree = mockBST.bst14();
    tree.delete(1);
    expect(tree).toEqual(mockBST.bst13());
  });
  test('Delete root\'s leaf', () => {
    const tree = mockBST.bst14();
    tree.delete(2);
    expect(tree).toEqual(mockBST.bst12());
  });
  test('Delete node\'s leaf in right subtree', () => {
    const tree = mockBST.bst4();
    tree.delete(15);
    expect(tree).toEqual(mockBST.bst3());
  });
  test('Delete node\'s leaf in left subtree', () => {
    const tree = mockBST.bst7();
    tree.delete(-4);
    expect(tree).toEqual(mockBST.bst4());
  });
  test('Delete node in right subtree with only one child path', () => {
    const tree = mockBST.bst4();
    tree.delete(5);
    expect(tree).toEqual(mockBST.bst5());
  });
  test('Delete node in left subtree with only one child path', () => {
    const tree = mockBST.bst6();
    tree.delete(-1);
    expect(tree).toEqual(mockBST.bst7());
  });
  test('Delete root in a complete BST #1', () => {
    const tree = mockBST.bst8();
    tree.delete(15);
    expect(tree).toEqual(mockBST.bst9());
  });
  test('Delete root in a complete BST #2 [min node has right subtree]', () => {
    const tree = mockBST.bst10();
    tree.delete(15);
    expect(tree).toEqual(mockBST.bst11());
  });
  test('Delete node in a complete BST #1', () => {
    const tree = mockBST.bst15();
    tree.delete(20);
    expect(tree).toEqual(mockBST.bst16());
  });
  test('Delete node in a complete BST #2 [min node has right subtree]', () => {
    const tree = mockBST.bst17();
    tree.delete(20);
    expect(tree).toEqual(mockBST.bst18());
  });
  test('Delete unexisting data in a complete BST', () => {
    const tree = mockBST.bst10();
    tree.delete(50);
    expect(tree).toEqual(mockBST.bst10());
  });
  test('Delete root which is a leaf (recursive)', () => {
    const tree = mockBST.bst12();
    tree.delete(1, true);
    expect(tree).toEqual(mockBST.bst0());
  });
  test('Delete root with a leaf (recursive)', () => {
    const tree = mockBST.bst14();
    tree.delete(1, true);
    expect(tree).toEqual(mockBST.bst13());
  });
  test('Delete root\'s leaf (recursive)', () => {
    const tree = mockBST.bst14();
    tree.delete(2, true);
    expect(tree).toEqual(mockBST.bst12());
  });
  test('Delete node\'s leaf in right subtree (recursive)', () => {
    const tree = mockBST.bst4();
    tree.delete(15, true);
    expect(tree).toEqual(mockBST.bst3());
  });
  test('Delete node\'s leaf in left subtree (recursive)', () => {
    const tree = mockBST.bst7();
    tree.delete(-4, true);
    expect(tree).toEqual(mockBST.bst4());
  });
  test('Delete node in right subtree with only one child path (recursive)', () => {
    const tree = mockBST.bst4();
    tree.delete(5, true);
    expect(tree).toEqual(mockBST.bst5());
  });
  test('Delete node in left subtree with only one child path (recursive)', () => {
    const tree = mockBST.bst6();
    tree.delete(-1, true);
    expect(tree).toEqual(mockBST.bst7());
  });
  test('Delete root in a complete BST #1 (recursive)', () => {
    const tree = mockBST.bst8();
    tree.delete(15, true);
    expect(tree).toEqual(mockBST.bst9());
  });
  test('Delete root in a complete BST #2 [min node has right subtree] (recursive)', () => {
    const tree = mockBST.bst10();
    tree.delete(15, true);
    expect(tree).toEqual(mockBST.bst11());
  });
  test('Delete node in a complete BST #1 (recursive)', () => {
    const tree = mockBST.bst15();
    tree.delete(20, true);
    expect(tree).toEqual(mockBST.bst16());
  });
  test('Delete node in a complete BST #2 [min node has right subtree] (recursive)', () => {
    const tree = mockBST.bst17();
    tree.delete(20, true);
    expect(tree).toEqual(mockBST.bst18());
  });
  test('Delete unexisting data in a complete BST (recursive)', () => {
    const tree = mockBST.bst10();
    tree.delete(50, true);
    expect(tree).toEqual(mockBST.bst10());
  });
  test('Find root', () => {
    const tree = mockBST.bst4();
    expect(tree.find(2)).toEqual(tree.root);
  });
  test('Find node', () => {
    const tree = mockBST.bst4();
    expect(tree.find(5)).toEqual(tree.root.right.right.right);
  });
  test('Find right leaf', () => {
    const tree = mockBST.bst4();
    expect(tree.find(15)).toEqual(tree.root.right.right.right.right);
  });
  test('Find left leaf', () => {
    const tree = mockBST.bst4();
    expect(tree.find(1)).toEqual(tree.root.left);
  });
  test('Cannot find', () => {
    const tree = mockBST.bst4();
    expect(tree.find(111)).toEqual(null);
  });
  test('Invalid find', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.find('ciao');
    }).toThrow('Invalid input');
  });
  test('Find root (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.find(2, true)).toEqual(tree.root);
  });
  test('Find node (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.find(5, true)).toEqual(tree.root.right.right.right);
  });
  test('Find right leaf (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.find(15, true)).toEqual(tree.root.right.right.right.right);
  });
  test('Find left leaf (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.find(1, true)).toEqual(tree.root.left);
  });
  test('Cannot find (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.find(111, true)).toEqual(null);
  });
  test('Invalid find (recursive)', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.find('ciao', true);
    }).toThrow('Invalid input');
  });
  test('Invalid height', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.height('ciao');
    }).toThrow('Invalid input');
  });
  test('Height root is 5', () => {
    const tree = mockBST.bst4();
    expect(tree.height()).toEqual(5);
  });
  test('Height left subtree is 1', () => {
    const tree = mockBST.bst4();
    expect(tree.height(tree.root.getLeft)).toEqual(1);
  });
  test('Height right subtree is 4', () => {
    const tree = mockBST.bst4();
    expect(tree.height(tree.root.getRight)).toEqual(4);
  });
  test('Height root is 5 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.height(tree.root, true)).toEqual(5);
  });
  test('Height left subtree is 1 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.height(tree.root.getLeft, true)).toEqual(1);
  });
  test('Height right subtree is 4 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.height(tree.root.getRight, true)).toEqual(4);
  });
  test('Invalid depth', () => {
    expect(() => {
      const tree = new BalancedBST();
      tree.depth('ciao');
    }).toThrow('Invalid input');
  });
  test('Depth root is 0', () => {
    const tree = mockBST.bst4();
    expect(tree.depth()).toEqual(0);
  });
  test('Depth left subtree is 1', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getLeft)).toEqual(1);
  });
  test('Depth right subtree is 1', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getRight)).toEqual(1);
  });
  test('Depth right subtree leaf is 4', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getRight.getRight.getRight.getRight)).toEqual(4);
  });
  test('Depth root is 0 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root, true)).toEqual(0);
  });
  test('Depth left subtree is 1 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getLeft, true)).toEqual(1);
  });
  test('Depth right subtree is 1 (recursive)', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getRight, true)).toEqual(1);
  });
  test('Depth right subtree leaf is 4', () => {
    const tree = mockBST.bst4();
    expect(tree.depth(tree.root.getRight.getRight.getRight.getRight)).toEqual(4);
  });
});
