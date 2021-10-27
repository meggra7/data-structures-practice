const getFixedArray = require('../util/getFixedArray');

/**
 *  Arraylists use arrays as the underlying storage mechanism.  In Javascript, arrays are already
 *  unbounded - so there's not really a lot of upside to an arraylist implementation.  To practice
 *  arraylists as they must be implemented in languages with fixed size arrays, we recommend
 *  leveraging the provided `getFixedArray` method, which uses Object.seal() to fix the length
 *  of the array.
 */
class ArrayList {
  /**
   *  Not all ArrayLists provide an initial capacity constructor, but we've chosen to do so here.
   *  
   *  @param initialCapacity - a decent guess at the eventual size of the list, so an array
   *  of that size can be preallocated.
   */
  constructor(initialCapacity = 10) {
    this._arrayList = getFixedArray(initialCapacity);
    this._capacity = initialCapacity;
    this._size = 0;
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
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  insert(i, item) {

    if (i <= this._size) {
      // Index is within bounds...
      if (item != null) {
        // ...and item isn't null. Ok to proceed.

        // Check if room to insert.
        if (this._size === this._capacity) {
          // Capacity is met. Increase size of array.
          this._increaseArraySize();
        }

        // Loop from end until insertion index, shifting existing items ahead by 1.
        for (let indexToShift = this._size - 1; indexToShift >= i; indexToShift--) {
          this._arrayList[indexToShift + 1] = this._arrayList[indexToShift];
        }

        // Set new item at insertion index
        this._arrayList[i] = item;

        // Increase size
        this._size++;

      } else {
        throw new Error("Insertion error; item is null or undefined");
      }
    } else {
      throw new Error("Insertion error; index out of bounds");
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
   *  @timeComplexity O(1) - most of the time.  Possible worst case of O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n)
   */
  append(item) {

    if (item != null) {

      // Check if room to insert.
      if (this._size === this._capacity) {
        // Capacity is met. Increase size of array.
        this._increaseArraySize();
      }

      // Add item to next open space in the array
      this._arrayList[this._size] = item;

      // Increase size
      this._size++;

    } else {
      throw new Error("Error appending item; item is null or undefined.");
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
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  prepend(item) {

    if (item != null) {

      // Check if room to insert.
      if (this._size === this._capacity) {
        // Capacity is met. Increase size of array.
        this._increaseArraySize();
      }

      // Shift all existing items ahead by 1.
      for (let indexToShift = this._size - 1; indexToShift >= 0; indexToShift--) {
        this._arrayList[indexToShift + 1] = this._arrayList[indexToShift];
      }

      // Set new item at initial index
      this._arrayList[0] = item;

      // Increase size
      this._size++;

    } else {
      throw new Error("Error prepending item; item is null or undefined.");
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

    if (i < this._size) {

      let itemToRemove = this._arrayList[i];

      // Loop from removal index forward, shifting existing items back by 1.
      for (let indexToShift = i; indexToShift < this._size; indexToShift++) {

        if (indexToShift !== this._size - 1) {
          // If not yet at the end, shift items back
          this._arrayList[indexToShift] = this._arrayList[indexToShift + 1];
        } else {
          // If at end, nullify final index
          this._arrayList[indexToShift] = null;
        }
      }

      // Decrease size
      this._size--;

      // Return removed item
      return itemToRemove;

    } else {
      throw new Error("Error removing item; index out of bounds.");
    }
  }

  /**
   *  Remove and return the first item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(0)`
   *  
   *  @return the first item, or null for an empty list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeFirst() {

    if (this._size !== 0) {

      let itemToRemove = this._arrayList[0];

      // Shift all existing items back by 1.
      for (let indexToShift = 0; indexToShift < this._size; indexToShift++) {

        if (indexToShift !== this._size - 1) {
          // If not yet at the end, shift item back
          this._arrayList[indexToShift] = this._arrayList[indexToShift + 1];
        } else {
          // If at end, nullify final index
          this._arrayList[indexToShift] = null;
        }
      }

      // Decrease size
      this._size--;

      // Return removed item
      return itemToRemove;

    } else {
      // List is empty.
      return null;
    }
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

    if (this._size !== 0) {

      let itemToRemove = this._arrayList[this._size - 1];

      // Nullify final index
      this._arrayList[this._size - 1];

      // Decrease size
      this._size--;

      // Return removed item
      return itemToRemove;

    } else {
      // List is empty.
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

    // Loop through all items from beginning
    for (let i = 0; i < this._size; i++) {
      if (this._arrayList[i].equals(item)) {
        // Matching item found. Remove it and return index where it was found
        this.remove(i);
        return i;
      }
    }

    // Item not found. Return -1
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

    // Loop through all items from beginning
    for (let i = 0; i < this._size; i++) {
      if (this._arrayList[i].equals(item)) {
        // Matching item found.
        return true;
      }
    }

    // Item not found.
    return false;
  }

  /**
   *  Return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to find
   *  @return the item at that point in the list.
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek(i) {

    if (i < this._size) {
      return this._arrayList[i];
    } else {
      throw new Error("Error peeking at item; index is out of bounds.");
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
    return this._arrayList[0];
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
    if (this._size !== 0) {
      return this._arrayList[this._size - 1];
    } else {
      return null;
    }
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return this._size;
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
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(log n)
   */
  sort(comparator) {

    // Only sort if list has at least 2 values or more
    if (this._size > 1) {

      // Quick sort option, call from 0 through current size of array
      this._quickSort(0, this._size - 1, comparator);
    }
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

    // Initialize new instance of the list
    let newList = new ArrayList(this._size);

    // Copy over all values to the new instance
    for (let i = 0; i < this._size; i++) {
      newList.append(this._arrayList[i]);
    }

    // Sort the new list
    newList.sort(comparator);

    // Return sorted array.
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

    // Initialize array of exact size
    let arrayToReturn = getFixedArray(this._size);

    // Copy over all items
    for (let i = 0; i < this._size; i++) {
      arrayToReturn[i] = this._arrayList[i];
    }

    // Return array of exact size (no empty spaces at end)
    return arrayToReturn;
  }

  _quickSort(initialStartIndex, initialPivotIndex, comparator) {

    let startIndex = initialStartIndex;
    let pivotIndex = initialPivotIndex;

    // Work your way from both ends inward until the pivot has compared all values
    while (pivotIndex > startIndex) {

      // Compare pivot value to starting value.
      if (comparator(this._arrayList[pivotIndex], this._arrayList[startIndex]) > 0) {

        // If pivot is greater than start, values already in relative order. Move up starting index.
        startIndex++;

      } else {

        // Otherwise, values out of relative order. 
        // Shift down the pivot and insert the start value above it.
        // (Reassign value directly below the pivot to start position, to make room for downward shift)
        const startValue = this._arrayList[startIndex];
        this._arrayList[startIndex] = this._arrayList[pivotIndex - 1];
        this._arrayList[pivotIndex - 1] = this._arrayList[pivotIndex];
        this._arrayList[pivotIndex] = startValue;

        // Move down pivot index
        pivotIndex--;
      }
    }

    // We can be sure pivot value is now in the correct index.

    // If values remain to the left of the pivot's final position, continue sorting left half
    if (pivotIndex > initialStartIndex) {
      this._quickSort(0, pivotIndex - 1, comparator);
    }

    // If values remain to the right of the pivot's final position, continue sorting right half
    if (pivotIndex < initialPivotIndex) {
      this._quickSort(pivotIndex + 1, this._size - 1, comparator);
    }
  }

  /**
   *  Helper method to increase size of fixed array as needed when inserting, appending, or prepending.
   */
  _increaseArraySize() {
    // Double size of array...
    this._capacity *= 2;
    let largerArray = getFixedArray(this._capacity);
    // ...and copy all current items.
    for (let indexToCopy = 0; indexToCopy < this._size; indexToCopy++) {
      largerArray[indexToCopy] = this._arrayList[indexToCopy];
    }
    // Store larger array.
    this._arrayList = largerArray;
  }
}

module.exports = ArrayList;
