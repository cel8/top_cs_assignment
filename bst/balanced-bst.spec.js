const BalancedBST = require('./balanced-bst');
const Node = require('./node');

const mockBST = {
  bst0: function() {
    const tree = new BalancedBST([]);
    this.array = [];
    this.root = null;
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
  test.skip('Delete', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(1, true);
    expect(tree).toEqual(mockBST.bst1());
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

  test.skip('test2', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    tree.printTree();
    console.log(tree.find(1));
    console.log(tree.find(5));
    console.log(tree.find(15));
    console.log(tree.find(17));
    console.log(tree.find(4));
    console.log(tree.height(tree.root));
    console.log(tree.height(tree.root.getLeft));
    console.log(tree.height(tree.root.getRight));
    console.log(tree.depth(tree.root));
    console.log(tree.depth(tree.root.getLeft));
    console.log(tree.depth(tree.root.getRight));
    console.log(tree.depth(tree.root.getRight.getRight.getRight));
    expect(1).toEqual(1);
  });
  test.skip('test3', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    tree.delete(15);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test.skip('test4', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    tree.delete(5);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test.skip('test5', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(-1);
    tree.insert(-4);
    tree.insert(5);
    tree.insert(15);
    tree.delete(-1);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test.skip('test6', () => {
    const tree = new BalancedBST([1, 2]);
    tree.buildTree();
    tree.delete(1);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test.skip('test7', () => {
    const tree = new BalancedBST([1]);
    tree.buildTree();
    tree.delete(1);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test.skip('test8', () => {
    const tree = new BalancedBST([]);
    tree.buildTree();
    tree.delete(5);
    tree.printTree();
    expect(1).toEqual(1);
  });
});
