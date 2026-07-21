// init empty linked list, head is the beginning of the list
function initList() {
  return {
    head: null,
    length: 0
  };
}

// check if linked list is empty
function isEmpty(list) {
  return list.length === 0;
}

// add element to linked list
function add(list, element) {
  // create a node, each element consists of an element and a reference (next) to the next element
  const node = {
    element,
    next: null
  };

  // if linked list is empty assign node to head of the list
  if (isEmpty(list)) {
    list.head = node;
  } else {
    // if linked list is not empty traverse to find the last node, and assign new node to last next
    let current = list.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }
  // increment length
  list.length++;
}

// remove specific element form linked list
function remove(list, element) {
  let previous = null;
  let current = list.head;

  // traverse list, searching for specific element
  while (current !== null && current.element !== element) {
    previous = current;
    current = current.next;
  }

  // reach the end and search element not found, do nothing, return
  if (current === null) {
    return;
  }

  // if found element is somewhere within the list link previous.next to current.next, thus skipping the current found node
  if (previous !== null) {
    previous.next = current.next;
    // previous is null means that element is in the head, so assign next to head, skipping the current
  } else {
    list.head = current.next;
  }
  // decrement list length
  list.length--;

}

const myList = initList();
console.log(JSON.stringify(myList, null, 2));
add(myList, 42);
add(myList, 43);
add(myList, 44);
console.log(JSON.stringify(myList, null, 2));
console.log(isEmpty(myList));
remove(myList, 44);
console.log(JSON.stringify(myList, null, 2));