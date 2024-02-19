const LinkedList = (head = null) => {
  const append = function (element) {
    const lastNode = Node(element);
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = lastNode;
  };

  const prepend = function (element) {
    const firstNode = Node(element);
    firstNode.next = this.head;
    this.head = firstNode;
  };

  const size = function () {
    let currentNode = this.head;
    let counter = 0;
    while (currentNode) {
      counter++;
      currentNode = currentNode.next;
    }
    return `Size: ${counter}`;
  };

  const getTail = function () {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };

  const at = function (index) {
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };

  const pop = function () {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
  };

  const contains = function (target) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value == target) return true;
      currentNode = currentNode.next;
    }
    return false;
  };

  const find = function (target) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === target) return index;
      currentNode = currentNode.next;
      index++;
    }
    return null;
  };

  const toString = function () {
    let currentNode = this.head;
    while (currentNode) {
      console.log(`( ${currentNode.value} ) -> `);
      currentNode = currentNode.next;
    }
    console.log("null");
  };

  const insertAt = function (element, index) {
    let newNode = Node(element);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let currentNode = this.head;
    let prevNode = null;
    let counter = 0;
    while (currentNode && counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    if (counter === index) {
      newNode.next = currentNode;
      prevNode.next = newNode;
    }
  };

  const removeAt = function (index) {
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let currentNode = this.head;
    let prevNode = null;
    let counter = 0;
    while (currentNode && counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    if (counter === index) {
      prevNode.next = currentNode.next;
    }
  };

  const containsKey = function (target) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value[0] == target) return true;
      currentNode = currentNode.next;
    }
    return false;
  };

  const findKey = function (target) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value[0] === target) return index;
      currentNode = currentNode.next;
      index++;
    }
    return null;
  };

  return {
    head: head,
    prepend,
    append,
    size,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    containsKey,
    findKey,
  };
};

const Node = (value = null) => {
  return { value: value, next: null };
};

module.exports = {
  Node,
  LinkedList,
};
/*
let node1 = Node(2);
let node2 = Node(5);
node1.next = node2;

const list = LinkedList(node1);
list.prepend(8);
list.append(9);
list.insertAt(25, 1);
console.log(list.head.value);
console.log(list.head.next.value);
console.log(list.head.next.next.value);
console.log(list.head.next.next.next.value);
console.log(list.head.next.next.next.next.value);
list.removeAt(1);
console.log(list.head.value);
console.log(list.head.next.value);
console.log(list.head.next.next.value);
console.log(list.head.next.next.next.value);
*/
