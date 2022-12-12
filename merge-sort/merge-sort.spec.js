const { mergeSort } = require('./merge-sort');

describe('mergeSort', () => {
  test('Sort 0 elements', () => {
    expect(mergeSort([])).toEqual([]);
  });
  test('Sort 1 element', () => {
    expect(mergeSort([8])).toEqual([8]);
  });
  test('Sort even elements', () => {
    expect(mergeSort([9, 1, 7, 99, 35, 66, 5, 10])).toEqual([1, 5, 7, 9, 10, 35, 66, 99]);
  });
  test('Sort odd elements', () => {
    expect(mergeSort([66, 6, 101, 3, 35, 66, 5, 10, 2])).toEqual([2, 3, 5, 6, 10, 35, 66, 66, 101]);
  });
  test('Already sorted', () => {
    expect(mergeSort([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('All the same', () => {
    expect(mergeSort([55, 55, 55, 55])).toEqual([55, 55, 55, 55]);
  });
  test('Invalid parameter: input is not vector', () => {
    expect(mergeSort(1)).toEqual('invalid parameter');
  });
  test('Invalid parameter: input do not contains integer (mixed)', () => {
    expect(mergeSort(['1','ciao',4])).toEqual('invalid array elements');
  });
  test('Invalid parameter: input do not contains integer (strings)', () => {
    expect(mergeSort(['1','ciao','x5k'])).toEqual('invalid array elements');
  });
});
