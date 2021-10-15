/**
 *  Queues are first in, first out data structures with only two modification behaviours:
 *    Enqueue: Add something to the queue
 *    Dequeue: Remove and return the first thing in the queue.
 */
class Queue {
  /**
   *  Queue Constructors take no arguments
   */
  constructor() {
    this._head;
    this._tail;
  }

  /****************
   * MODIFICATION *
   ****************/
  /**
   *  Add a new item to the queue.
   *  
   *  @param item the thing to remember
   *  @return void
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  enqueue(item) {

    // Make sure item is valid
    if (item != null) {

      let nodeToAdd = {
        data: item,
        next: null
      };

      if (this._head == null) {
        // Queue is empty, set as front of queue
        this._head = nodeToAdd;
      } else {
        // Queue isn't empty, add reference to current end of queue
        this._tail.next = nodeToAdd;
      }

      // Set as end of queue
      this._tail = nodeToAdd;
    } else {
      throw new Error("Error queueing item; item is null");
    }
  }

  /**
   *  Push the earliest remaining item off of the queue and return it.  This should error
   *  if the queue is empty.
   *  
   *  @return the first enqueued item still available
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  dequeue() {
    if (this._head != null) {
      let itemToReturn = this._head.data;
      this._head = this._head.next;
      return itemToReturn;
    } else {
      throw new Error("Error dequeueing item; queue is empty");
    }
  }

  /*****************
   * INTERROGATION *
   *****************/

  /**
   *  Return the earliest remaining item, but leave it at the head of the queue.  Like dequeue, this
   *  should error if the queue is empty.
   *  
   *  @return the first enqueued item still available
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek() {
    if (this._head != null) {
      return this._head.data;
    } else {
      throw new Error("Error peeking at queue; queue is empty");
    }
  }

  /**
   *  Return true if the queue is empty, or false if it is not.
   *  
   *  @return true or false, as queue emptiness is concerned
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._head == null;
  }
}

module.exports = Queue;
