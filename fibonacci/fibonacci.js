function checkParameters(n) {
  if (n < 0) return 'invalid negative';

  if (typeof(n) === 'string') {
    n = +n;
    if (Number.isNaN(n)) return 'invalid string';
  }

  return n;
}

function fibsIterative(n) {
  let m = 2;
  let parent = 1;
  let grandparent = 0;
  let total = 0;

  if (n <= 1) return n;

  while(m <= n) {
    total = parent + grandparent;
    grandparent = parent;
    parent = total;
    m++;
  }
  
  return total;
}

function fibsRecursive(n) {
  if (n <= 1) return n;
  return fibsRecursive(n - 1) + fibsRecursive(n - 2);
}

const fibs = function(n) {
  const m = checkParameters(n);
  let sequence = [];

  if(typeof(m) !== 'number') return m;

  for (let i = 0; i < m; ++i) {
    sequence.push(fibsIterative(i));
  }

  return sequence;
}

const fibsRec = function(n) {
  const m = checkParameters(n);
  let sequence = [];
  
  if(typeof(m) !== 'number') return m;
  
  for (let i = 0; i < m; ++i) {
    sequence.push(fibsRecursive(i));
  }

  return sequence;
}

module.exports = {
  fibs,
  fibsRec
};
