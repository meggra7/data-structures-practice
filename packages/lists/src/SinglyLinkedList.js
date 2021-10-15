/**
 *  Linked lists are structured as a series of nodes, each containing
 *  a stored item and a "next" pointer, to the next node in the list.
 *  The encapsulating class holds on to a pointer to the first node in
 *  the list - traditionally called the "head" of the list.
 */
class SinglyLinkedList {

  /**
   *  Traditionally, LinkedLists don't have much in the way of construction
   */
  constructor() {
    this._head = null;
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

    if (item != null) {
      // Valid item. Ok to continue.

      if (i >= 0 && i <= this._length) {
        // Index is within range. Ok to continue.

        // Create node to insert
        const nodeToAdd = {
          item: item,
          next: null
        }

        if (i === 0) {

          // Inserting at front of list. Update head only and finish.
          nodeToAdd.next = this._head;
          this._head = nodeToAdd;

        } else {

          // Initialize starting / current item as head...
          let currentNode = this._head;

          // ...and iterate through rest of list from head to tail.
          for (let position = 0; position < i; position++) {

            if (i === position + 1) {
              // Insert after current item
              nodeToAdd.next = currentNode.next;
              currentNode.next = nodeToAdd;
            }

            // Move to next item
            currentNode = currentNode.next;
          }
        }

        // Increase length
        this._length++;

      } else {
        throw new Error("Error inserting item; index is out of bounds.");
      }
    } else {
      throw new Error("Error inserting item; item is null or undefined.");
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
   *  @timeComplexity O(n) in naive implementations - possibly O(1)
   *  @spaceComplexity O(1)
   */
  append(item) {

    if (item != null) {
      this.insert(this._length, item);
    } else {
      throw new Error("Error appending item; item is null or undefined.")
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

    if (item != null) {
      this.insert(0, item);
    } else {
      throw new Error("Error prepending item; item is null or undefined.")
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

    if (i >= 0 && i < this._length) {
      // Index in bounds. Ok to continue.

      if (i === 0) {

        // Removing head. Get item and update head reference only.
        const itemToRemove = this._head.item;
        this._head = this._head.next;

        // Decrease length
        this._length--;

        // Return removed item
        return itemToRemove;

      } else {

        // Initialize starting / current item as head...
        let currentNode = this._head;

        // ...and iterate through rest of list from head until index reached.
        for (let position = 0; position < i; position++) {

          if (i === position + 1) {

            // Get item and update reference to following node instead
            const itemToRemove = currentNode.next.item;
            currentNode.next = currentNode.next.next;

            // Decrease length
            this._length--;

            // Return removed item
            return itemToRemove;
          }

          // Move to next item
          currentNode = currentNode.next;
        }
      }
    } else {
      throw new Error("Error removing item; index out of bounds.")
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
    if (this._length > 0) {
      this.remove(0);
    } else {
      return null;
    }
  }

  /**
   *  Remove and return the last item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(length - 1)`
   *  
   *  @return the last item, or null for an empty list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._length > 0) {
      this.remove(this._length - 1);
    } else {
      return null;
    }
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

    let currentNode = this._head;

    for (let index = 0; index < this._length; index++) {

      if (currentNode.item.equals(item)) {
        // Match found. Return index.
        return index;
      }

      currentNode = currentNode.next;
    }

    // If item not found by end of loop return -1.
    return -1;
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

    let currentNode = this._head;

    for (let index = 0; index < this._length; index++) {

      if (currentNode.item.equals(item)) {
        // Match found. Return true.
        return true;
      }

      currentNode = currentNode.next;
    }

    // If item not found by end of loop return false.
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

    if (i >= 0 && i < this._length) {
      // Index in bounds. Ok to continue.

      // Get first node
      let currentNode = this._head;

      // Iterate through list until item reached
      for (let position = 0; position < this._length; position++) {

        if (position === i) {
          // Index reached. Return item.
          return currentNode.item;
        }

        // Update to next node
        currentNode = currentNode.next;
      }
    } else {
      throw new Error("Error peeking list; index out of bounds.")
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

    if (this._length > 0) {
      return this._head.item;
    } else {
      return null;
    }
  }

  /**
   *  Return the last item in the list.
   *  
   *  Almost equivalent to `peek(length)`
   *  
   *  @return the item 
   *  @timeComplexity O(n) in a naive implementation - possibly O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._length > 0) {
      return this.peek(this._length - 1);
    } else {
      return null;
    }
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(n) in a naive implementation - possibly O(1)
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
    return new SinglyLinkedList();
  }

  /**
   *  Return all the items in this list in an array.
   *  
   *  @return an array with all the items in the list.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    return [];
  }
}

module.exports = SinglyLinkedList;
