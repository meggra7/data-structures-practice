/**
 *  It is recommended that you learn SinglyLinkedLists before moving
 *  on to Doubly linked lists.  In doubly linked lists, each node
 *  also points the previous node in the list.  This increases complexity for
 *  the programmer, but also allows "end of list" operations to be all done in
 *  constant time.
 */
class DoublyLinkedList {

  /**
   *  Traditionally, LinkedLists don't have much in the way of construction
   */
  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  Add the item at the specified point in the list.  This should error if 
   *  the specified index is not available, or if the item is null or undefined.
   *
   *  @param i the index in the list that the item should reside at.
   *  @param item the item to be inserted
   *  @return void
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  insert(i, item) {

    if (item == null) {
      throw new Error("Error inserting item; item is null");
    } else if (i < 0 || i > this._length) {
      throw new Error("Error inserting item: index out of range");
    }

    if (i === 0) {
      // Same as prepend
      return this.prepend(item);
    } else if (i === this._length) {
      // Same as append
      return this.append(item);
    } else {

      // Get node immediately before insertion point
      let previousNode = this._getNodeAt(i - 1);

      // Create new node and insert immediately after new node
      let newNode = {
        item: item,
        prev: previousNode,
        next: previousNode.next
      }

      // Update previous node to reference the new node
      previousNode.next = newNode;

      // Increase length
      this._length++;
    }
  }

  /**
   *  Add the item to the end of the list.  This should error if 
   *  the item is null or undefined.
   *  
   *  equivalent to `insert(length, item)`
   *  
   *  @param item the item to store
   *  @return void
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  append(item) {

    if (item == null) {
      throw new Error("Error appending item; item is null");
    }

    // Update tail to new node
    this._tail = {
      item: item,
      next: null,
      prev: this._tail
    }

    // Increase length
    this._length++;

    // If length is now 1, assign this node as head as well
    if (this._length === 1) {
      this._head = this._tail;
    } else {
      // Link to new tail in reverse, as previous node's next
      this._tail.prev.next = this._tail;
    }
  }

  /**
   *  Add the item to the beginning of the list.  This should error if 
   *  the item is null or undefined.
   *  
   *  equivalent to `insert(0, item)`
   *
   *  @param item the item to store
   *  @return void
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  prepend(item) {

    if (item == null) {
      throw new Error("Error prepending item; item is null");
    }

    // Update head to new node
    this._head = {
      item: item,
      next: this._head,
      prev: null
    }

    // Increase length
    this._length++;

    // If length is now 1, assign this node as tail as well
    if (this._length === 1) {
      this._tail = this._head;
    } else {
      // Link to new head in reverse, as next node's previous
      this._head.next.prev = this._head;
    }
  }

  /*********************
   * REMOVAL BEHAVIOUR *
   *********************/

  /**
   *  Remove and return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to remove
   *  @return the item removed
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {

    if (this._length === 0) {
      throw new Error("Error removing item; list is empty");
    } else if (i < 0 || i > this._length - 1) {
      throw new Error("Error removing item; index out of range");
    } else if (i === 0) {
      // Same as removeFirst
      return this.removeFirst();
    } else if (i === this._length - 1) {
      // Same as removeLast
      return this.removeLast();
    } else {

      // Get node to be removed
      const removed = this._getNodeAt(i);

      // Update surrounding nodes to bypass removed node
      removed.prev.next = removed.next;
      removed.next.prev = removed.prev;

      // Decrease length
      this._length--;

      // Return removed item
      return removed.item;
    }
  }

  /**
   *  Remove and return the first item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(0)`
   *  
   *  @return the first item, or null for an empty list
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeFirst() {

    if (this._length === 0) {
      return null;
    }

    // Store node to remove
    const removed = this._head;

    if (this._length === 1) {

      // If only one item, nullify head and tail
      this._head = null;
      this._tail = null;

    } else {

      // Otherwise, update head to next node...
      this._head = this._head.next;

      // ...and nullify previous reference for new head
      this._head.prev = null;
    }

    // Decrease length
    this._length--;

    return removed.item;
  }

  /**
   *  Remove and return the last item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(length - 1)`
   *  
   *  @return the last item, or null for an empty list
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {

    if (this._length === 0) {
      return null;
    }

    // Store node to remove
    const removed = this._tail;

    if (this._length === 1) {

      // If only one item, nullify head and tail
      this._head = null;
      this._tail = null;

    } else {

      // Otherwise, update tail to previous node...
      this._tail = this._tail.prev;

      // ...and nullify next reference for new tail
      this._tail.next = null;
    }

    // Decrease length
    this._length--;

    return removed.item;
  }

  /**
   *  Remove and return the index of the first instance of the specified item
   *  from the list.  You should assume that items have an `equals` method.
   *  
   *  @param item the item to find and remove
   *  @return the index the item held in the list, or -1 if not found
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {

    if (item == null || this._length == 0) {
      return -1;
    }

    if (this._head.item.equals(item)) {
      this.removeFirst();
      return 0;
    } else if (this._tail.item.equals(item)) {
      this.removeLast();
      return this._length; // After removal length will match previously last node's index
    } else {

      // Start at node immediately after head
      let index = 1;
      let currentNode = this._head.next;

      // Iterate though all nodes, comparing item until found
      while (index < this._length - 1) {

        if (currentNode.item.equals(item)) {

          // Effectively remove item by updating surrounding nodes to bypass it
          currentNode.prev.next = currentNode.next;
          currentNode.next.prev = currentNode.prev;

          // Decrease length
          this._length--;

          // Return index of removed item
          return index;
        }

        // If not a match, step forward
        index++;
        currentNode = currentNode.next;
      }

      // If match not found during iterating, return -1 as not found
      return -1;
    }
  }

  /*****************
   * Interrogation *
   *****************/

  /**
   *  Returns true if the passed item is in the list, or false otherwise.
   *  
   *  @param item the item to search for.
   *  @return boolean if the item is in the list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {

    // Initialize starting node
    let currentNode = this._head;

    while (currentNode != null) {

      if (currentNode.item.equals(item)) {
        return true;
      }

      // If not a match, step forward
      currentNode = currentNode.next;
    }

    // If not found by the time all nodes are checked, return false
    return false;
  }

  /**
   *  Return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to find
   *  @return the item at that point in the list.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  peek(i) {

    if (this._length === 0) {
      throw new Error("Error peeking at item; list is empty");
    }

    if (i < 0 || i > this._length - 1) {
      throw new Error("Error peeking at item; index out of range");
    }

    if (i === 0) {
      return this.peekFirst();
    } else if (i === this._length - 1) {
      return this.peekLast();
    } else {
      return this._getNodeAt(i).item;
    }
  }

  /**
   *  Return the first item in the list.
   *  
   *  Almost equivalent to `peek(0)`
   *  
   *  @return the item
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {

    if (this._length === 0) {
      return null;
    }

    return this._head.item;
  }

  /**
   *  Return the last item in the list.
   *  
   *  Almost equivalent to `peek(length)`
   *  
   *  @return the item 
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {

    if (this._length === 0) {
      return null;
    }

    return this._tail.item;
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return this._length;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  Sort the list, in place.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @return void
   *  @timeComplexity O(n^2) in the space optimized version,
   *    O(n logn) in the time optimized version
   *  @spaceComplexity O(1) in the space optimized version,
   *    O(n) in the time optimized version
   */
  sort(comparator) {

    // Bubble sort option
    this._bubbleSort(comparator);
  }

  /**
   *  Return a new, sorted copy of the list.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @return void
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {

    // Create new instance of list
    let newList = new DoublyLinkedList();

    // If existing list has at least one item, copy over head item and length attributes
    if (this._length > 0) {

      newList._head = {
        item: this._head.item,
        next: null,
        prev: null
      }

      newList._length = this._length;
    }

    // Get references to new and existing nodes, starting at head for both
    let newNode = newList._head;
    let existingNode = this._head;

    // Iterate through all nodes, adding next node each time
    // Only check while position less than length MINUS one, as we'll be checking for next nodes' values
    for (let position = 0; position < this._length - 1; position++) {

      // Create next node in the list
      newNode.next = {
        item: existingNode.next.item,
        prev: newNode
      }

      // And walk both lists forward
      newNode = newNode.next;
      existingNode = existingNode.next;
    }

    // Update tail (should be newNode after final walk forward)
    newList._tail = newNode;

    // Sort new list
    newList.sort(comparator);

    // Return new list
    return newList;
  }

  /**
   *  Return all the items in this list in an array.
   *  
   *  @return an array with all the items in the list.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {

    let arrayToReturn = [];

    // Initialize starting node from head
    let currentNode = this._head;

    while (currentNode != null) {

      // Push item to array
      arrayToReturn.push(currentNode.item);

      // Step node forward
      currentNode = currentNode.next;
    }

    return arrayToReturn;
  }

  _getNodeAt(index) {

    let position = 0;
    let currentNode = this._head;

    while (currentNode != null && position < index) {
      currentNode = currentNode.next;
      position++;
    }

    return currentNode;
  }

  _bubbleSort(comparator) {

    // Only sort if more than one item in the list
    if (this._length > 1) {

      // Initialize iterations to complete
      let iterationsToComplete = this._length - 1;

      // Iterate through list, swapping values as needed
      while (iterationsToComplete > 0) {

        // Get starting node
        let currentNode = this._head;

        for (let position = 0; position < iterationsToComplete; position++) {

          if (comparator(currentNode.item, currentNode.next.item) > 0) {
            this._swap(currentNode);
          }

          currentNode = currentNode.next;
        }
        iterationsToComplete--;
      }
    }
  }

  /**
   * Swap the node's item with the next node's item
   * @param {*} node 
   */
  _swap(node) {
    const tmp = node.item;
    node.item = node.next.item;
    node.next.item = tmp;
  }
}

module.exports = DoublyLinkedList;

