const BalancedBST = require('./balanced-bst');

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new BalancedBST(randomArray(30));
tree.buildTree();
console.log('Balanced:', tree.isBalanced());
console.log('Lever Order =>', tree.levelOrder());
console.log('Preorder =>', tree.preOrder());
console.log('Inorder =>', tree.inOrder());
console.log('Postorder =>', tree.postOrder());

for (let i = 0; i < 5; i++) {
  tree.insert(Math.floor(Math.random() * 20));
}
console.log('Balanced:', tree.isBalanced());

tree.rebalance();
console.log('Balanced:', tree.isBalanced());
console.log('Lever Order =>', tree.levelOrder());
console.log('Preorder =>', tree.preOrder());
console.log('Inorder =>', tree.inOrder());
console.log('Postorder =>', tree.postOrder());
