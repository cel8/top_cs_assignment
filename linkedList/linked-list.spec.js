const LinkedList = require('./linked-list');
const Node = require('./node');

const mockLinkedList = {
  one: function() {
    const refList = new LinkedList();
    refList.headNode = new Node();
    refList.headNode.value = 3;
    refList.tailNode = refList.headNode;
    return refList;
  },
  oneString: function() {
    return '( 3 ) -> null';
  },
  twoFirst: function() {
    const refList = new LinkedList();
    refList.headNode = new Node();
    refList.headNode.value = 1;
    refList.headNode.next = new Node();
    refList.headNode.next.value = 3;
    refList.tailNode = refList.headNode.next;
    return refList;
  },
  twoSecond: function() {
    const refList = new LinkedList();
    refList.headNode = new Node();
    refList.headNode.value = 1;
    refList.headNode.next = new Node();
    refList.headNode.next.value = 2;
    refList.tailNode = refList.headNode.next;
    return refList;
  },
  three: function() {
    const refList = new LinkedList();
    refList.headNode = new Node();
    refList.headNode.value = 1;
    refList.headNode.next = new Node();
    refList.headNode.next.value = 2;
    refList.headNode.next.next = new Node();
    refList.headNode.next.next.value = 3;
    refList.tailNode = refList.headNode.next.next;
    return refList;
  },
  threeString: function() {
    return '( 1 ) -> ( 2 ) -> ( 3 ) -> null';
  },
  empty: function() {
    const refList = new LinkedList();
    return refList;
  },
  emptyString: function() {
    return 'null';
  },
}

describe('Node', () => {
  test('set valid value (number)', () => {
    const node = new Node();
    node.setValue = 1;
    expect(node.getValue).toEqual(1);
  });

  test('set valid value (string number)', () => {
    const node = new Node();
    node.setValue = '1';
    expect(node.getValue).toEqual(1);
  });

  test('set invalid value (string)', () => {
    const node = new Node();
    expect(() => {
      node.setValue = 'ciao';
    }).toThrow('Invalid input');
  });

  test('set invalid value (Array)', () => {
    const node = new Node();
    expect(() => {
      node.setValue = [ 1, 2, 3 ];
    }).toThrow('Invalid input');
  });

  test('set valid next (node)', () => {
    const node1 = new Node();
    const node2 = new Node();
    node1.setValue = 1;
    node2.setValue = 2;
    node1.setNext = node2;

    expect(node1.getNext).toEqual(node2);
  });

  test('set valid next (node)', () => {
    const node = new Node();
    node.setValue = 1;
    node.setNext = null;

    expect(node.getNext).toEqual(null);
  });

  test('set invalid next (string)', () => {
    const node = new Node();
    expect(() => {
      node.setNext = 'ciao';
    }).toThrow('Invalid input');
  });

  test('set invalid next (Array)', () => {
    const node = new Node();
    expect(() => {
      node.setNext = [ 1, 2, 3 ];
    }).toThrow('Invalid input');
  });
});

describe('LinkedList', () => {
  test('append', () => {
    const refList = mockLinkedList.one();

    const list = new LinkedList();
    list.append(3);
    expect(list).toEqual(refList);
  });

  test('append invalid value (string)', () => {
    const list = new LinkedList();
    expect(() => {
      list.append('ciao');
    }).toThrow('Invalid input');
  });

  test('append three elements', () => {
    const refList = mockLinkedList.three();

    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list).toEqual(refList);
  });

  test('prepend', () => {
    const refList = mockLinkedList.one();

    const list = new LinkedList();
    list.prepend(3);
    expect(list).toEqual(refList);
  });

  test('prepend invalid value (string)', () => {
    const list = new LinkedList();
    expect(() => {
      list.prepend('ciao');
    }).toThrow('Invalid input');
  });

  test('prepend 1 in list', () => {
    const refList = mockLinkedList.three();

    const list = new LinkedList();
    list.append(2);
    list.append(3);
    list.prepend(1);
    expect(list).toEqual(refList);
  });

  test('list size is empty', () => {
    const list = new LinkedList();
    expect(list.size()).toEqual(0);
  });

  test('list size is 3', () => {
    const list = new LinkedList();
    const spy = jest.spyOn(list, 'append');
    list.append(1);
    list.append(2);
    list.append(3);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(list.size()).toEqual(3);
  });

  test('empty head', () => {
    const list = new LinkedList();
    expect(list.head()).toEqual(null);
  });

  test('empty tail', () => {
    const list = new LinkedList();
    expect(list.tail()).toEqual(null);
  });
  
  test('head', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.head()).toEqual(refList.headNode);
  });

  test('tail', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.tail()).toEqual(refList.tailNode);
  });

  test('head is tail', () => {
    const refList = mockLinkedList.one();
    const list = new LinkedList();
    list.append(3);
    expect(list.head()).toEqual(refList.headNode);
    expect(list.tail()).toEqual(refList.tailNode);
    expect(list.tail()).toEqual(refList.tailNode);
  });

  test('at 0', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.at(0)).toEqual(refList.headNode);
  });

  test('at 1', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.at(1)).toEqual(refList.headNode.next);
  });

  test('at overflow', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.at(10)).toEqual(null);
  });

  test('at negative', () => {
    const list = new LinkedList();
    expect(list.at(-1)).toEqual(null);
  });

  test('at invalid index', () => {
    const list = new LinkedList();
    expect(list.at('ciao')).toEqual(null);
  });

  test('at string 1', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.at('1')).toEqual(refList.headNode.next);
  });

  test('pop', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.pop();
    expect(list).toEqual(refList);
  });

  test('pop empty', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.pop();
    expect(list).toEqual(refList);
  });

  test('pop all', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.pop();
    list.pop();
    list.pop();
    expect(list).toEqual(refList);
  });

  test('find 1', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find(1)).toEqual(refList.headNode);
  });

  test('find 2', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find(2)).toEqual(refList.headNode.next);
  });

  test('find inexistent', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find(10)).toEqual(null);
  });

  test('find invalid value', () => {
    const list = new LinkedList();
    expect(list.find('ciao')).toEqual(null);
  });

  test('find string 2', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.find('2')).toEqual(refList.headNode.next);
  });

  test('contains', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.contains(2)).toBe(true);
  });

  test('dont contains', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.contains(55)).toBe(false);
  });

  test('toString empty', () => {
    const list = new LinkedList();
    expect(list.toString()).toEqual(mockLinkedList.emptyString());
  });

  test('toString single', () => {
    const list = new LinkedList();
    list.append(3);
    expect(list.toString()).toEqual(mockLinkedList.oneString());
  });

  test('toString three', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.toString()).toEqual(mockLinkedList.threeString());
  });

  test('insert 0', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(2);
    list.append(3);
    list.insertAt(1, 0);
    expect(list).toEqual(refList);
  });

  test('insert default', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(2);
    list.append(3);
    list.insertAt(1);
    expect(list).toEqual(refList);
  });

  test('insert 2 at 1', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(3);
    list.insertAt(2, 1);
    expect(list).toEqual(refList);
  });

  test('insert 3 at overflow', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.insertAt(3, 10);
    expect(list).toEqual(refList);
  });

  test('insert value at negative', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.insertAt(3, -1);
    expect(list).toEqual(refList);
  });

  test('insert 3 at invalid index', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.insertAt(3, 'ciao');
    expect(list).toEqual(refList);
  });

  test('insert 2 at string 1', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(3);
    list.insertAt(2, '1');
    expect(list).toEqual(refList);
  });

  test('insertAt invalid value (string) at 0', () => {
    const list = new LinkedList();
    expect(() => {
      list.insertAt('ciao');
    }).toThrow('Invalid input');
  });

  test('remove empty', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.removeAt(0);
    expect(list).toEqual(refList);
  });

  test('remove first', () => {
    const refList = mockLinkedList.one();
    const list = new LinkedList();
    list.append(1);
    list.append(3);
    list.removeAt(0);
    expect(list).toEqual(refList);
  });

  test('remove default', () => {
    const refList = mockLinkedList.one();
    const list = new LinkedList();
    list.append(1);
    list.append(3);
    list.removeAt();
    expect(list).toEqual(refList);
  });

  test('remove middle', () => {
    const refList = mockLinkedList.twoFirst();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt(1);
    expect(list).toEqual(refList);
  });

  test('remove last', () => {
    const refList = mockLinkedList.twoSecond();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt(2);
    expect(list).toEqual(refList);
  });

  test('remove all', () => {
    const refList = mockLinkedList.empty();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt();
    list.removeAt();
    list.removeAt();
    expect(list).toEqual(refList);
  });

  test('remove invalid (string)', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt('ciao');
    expect(list).toEqual(refList);
  });

  test('remove invalid (negative)', () => {
    const refList = mockLinkedList.three();
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt(-5);
    expect(list).toEqual(refList);
  });  
});
