const BalancedBST = require('./balanced-bst');
const Node = require('./node');

describe('BalancedBST', () => {
  test.skip('test', () => {
    const tree = new BalancedBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    tree.buildTree();
    expect(1).toEqual(1);
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
  test('test3', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    tree.delete(15);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test('test4', () => {
    const tree = new BalancedBST([1, 2, 3, 4]);
    tree.buildTree();
    tree.insert(5);
    tree.insert(15);
    tree.delete(5);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test('test5', () => {
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
  test('test6', () => {
    const tree = new BalancedBST([1, 2]);
    tree.buildTree();
    tree.delete(1);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test('test7', () => {
    const tree = new BalancedBST([1]);
    tree.buildTree();
    tree.delete(1);
    tree.printTree();
    expect(1).toEqual(1);
  });
  test('test8', () => {
    const tree = new BalancedBST([]);
    tree.buildTree();
    tree.delete(5);
    tree.printTree();
    expect(1).toEqual(1);
  });
});
