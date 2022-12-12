const { fibs, fibsRec } = require('./fibonacci');

describe('fibs', () => {
  test('4th fibonacci sequence number is [ 0, 1, 1, 2 ]', () => {
    expect(fibs(4)).toEqual([ 0, 1, 1, 2 ]);
  });
  test('8th fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13 ]', () => {
    expect(fibs(8)).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13 ]);
  });
  test('13th fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]', () => {
    expect(fibs(13)).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]);
  });
  test('8th accept string fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13 ]', () => {
    expect(fibs('8')).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13 ]);
  });
  test('Doesn\'t accept negatives', () => {
    expect(fibs(-1)).toEqual('invalid negative');
  });
  test('Doesn\'t accept invalid string', () => {
    expect(fibs('abc')).toEqual('invalid string');
  });
});

describe('fibsRec', () => {
  test('4th fibonacci sequence number is [ 0, 1, 1, 2 ]', () => {
    expect(fibsRec(4)).toEqual([ 0, 1, 1, 2 ]);
  });
  test('8th fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13 ]', () => {
    expect(fibsRec(8)).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13 ]);
  });
  test('13th fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]', () => {
    expect(fibsRec(13)).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]);
  });
  test('8th accept string fibonacci sequence number is [ 0, 1, 1, 2, 3, 5, 8, 13 ]', () => {
    expect(fibsRec('8')).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13 ]);
  });
  test('Doesn\'t accept negatives', () => {
    expect(fibsRec(-1)).toEqual('invalid negative');
  });
  test('Doesn\'t accept invalid string', () => {
    expect(fibsRec('abc')).toEqual('invalid string');
  });
});
