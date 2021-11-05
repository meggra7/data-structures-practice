/**
 *  Stacks are Last in, first out data structures with only two modification behaviours:
 *    Push: Add something to the stack
 *    Pop: Remove the last thing that was pushed.
 */
class StackUsingArray {
    /**
     *  Stack Constructors take no arguments.
     */
    constructor() {
        this._stack = [];
        this._nextIndex = 0;
    }

    /****************
     * MODIFICATION *
     ****************/

    /**
     *  Push a new item onto the stack.  This should error if the item is null or undefined.
     *  
     *  @param item the thing to remember
     *  @return void
     *  @timeComplexity O(1)
     *  @spaceComplexity O(1) - though the nature of that constant performance depends on implementation.
     */
    push(item) {
        if (item != null) {
            this._stack[this._nextIndex] = item;
            this._nextIndex++;
        } else {
            throw new Error("Error pushing to stack; item is null or undefined.");
        }
    }

    /**
     *  Pop the most recent item off of the stack and return it.  This should error if the stack is
     *  empty.
     *  
     *  @return the last pushed item
     *  @timeComplexity O(1)
     *  @spaceComplexity O(1)
     */
    pop() {
        if (this._nextIndex !== 0) {
            this._nextIndex--;
            return this._stack[this._nextIndex];
        } else {
            throw new Error("Error popping from stack; stack is empty.")
        }
    }


    /*****************
     * INTERROGATION *
     *****************/

    /**
     *  Return the most recent item pushed to the stack, but leave it on the top of the stack.
     *  Like Pop, this should error if the stack is empty.
     *  
     *  @return the last pushed item
     *  @timeComplexity O(1)
     *  @spaceComplexity O(1)
     */
    peek() {
        if (this._nextIndex !== 0) {
            return this._stack[this._nextIndex - 1];
        } else {
            throw new Error("Error peeking at stack; stack is empty.")
        }
    }

    /**
     *  Return true if the stack is empty, or false if it is not.
     *  
     *  @return true or false, as stack emptiness is concerned
     *  @timeComplexity O(1)
     *  @spaceComplexity O(1)
     */
    isEmpty() {
        return this._nextIndex === 0;
    }
}

module.exports = StackUsingArray;
