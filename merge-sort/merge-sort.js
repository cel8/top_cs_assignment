function mergeSortRec(vector) {
  // Already merged
  if (vector.length < 2) return vector;
  
  const idxMid = Math.floor(vector.length / 2);

  const leftHalf = mergeSortRec(vector.slice(0, idxMid));
  const rightHalf = mergeSortRec(vector.slice(idxMid));

  return merge(leftHalf, rightHalf);

}

function merge(left, right) {
  const vector = [];

  // Order in vector elements from left or right
  while (left.length && right.length) {
    if (left.at(0) <= right.at(0)) vector.push(left.shift());
    else vector.push(right.shift());
  }

  return vector.concat(left, right); // Concat the left elements from right or left
}

const mergeSort = function(vector) {
  if (!Array.isArray(vector)) return 'invalid parameter';

  if (!vector.length) return [];

  if (!vector.every((e) => typeof(e) === 'number')) return 'invalid array elements';

  return mergeSortRec(vector);
}

module.exports = {
  mergeSort
};
