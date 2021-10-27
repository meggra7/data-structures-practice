"""Implement quick sort in Python.
Input a list.
Output a sorted list.

(From Udacity course https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513) """


def quicksort(array):

    if len(array) <= 1:
        return array
    # So, strictly speaking - this else is unneeded.  Since the `if` above it terminates the method, you can just go on with
    # the implementation here.
    else:
        #pivot selection is a nightmare!  A lot of ink has been spilled about how to best do this,
        #it's mostly academic, but you may wish to be aware of the academic argument.  Basically, in an
        #already sorted list, chosing the last element results in O(n^2) performance, because each time you recurse, you
        #only eliminate one element, so you have to recurse `n` times.  People have lots of available strategies - one is chosing
        # three indices at random and taking the median.  Once is trying to do a one-pass median calcualtion.  It's all 
        # a question of priorities, and _most_ still wind up putting the pivot at theend.
        pivot_index = len(array) - 1
        starting_index = 0

        while pivot_index > starting_index:

            if array[pivot_index] > array[starting_index]:
                # If the value of the pivot is greater than the start, the values are already sorted
                # relatively to each other and should stay in place. Update starting index only.
                starting_index = starting_index + 1
            else:
                # If the value of the pivot is less than or equal to the start, make
                # room to move up the start value so that it is above the pivot.
                # I love this shuffle that you do - it's really smart!
                start_value = array[starting_index]
                array[starting_index] = array[pivot_index - 1]
                array[pivot_index - 1] = array[pivot_index]
                array[pivot_index] = start_value

                # Then update the pivot index to continue comparing
                pivot_index = pivot_index - 1

        # Initialize new array to return
        sorted_array = []

        array_from_start_to_pivot = quicksort(array[0:pivot_index])
        sorted_array = sorted_array + array_from_start_to_pivot
        # for better or worse, you can use `+` to dot his at the end of the function...
        # return array_from_start_to_pivot + [array[pivot_index]] + array_from_pivot_to_end
        sorted_array.append(array[pivot_index])

        array_from_pivot_to_end = quicksort(array[pivot_index + 1 : len(array)])
        sorted_array = sorted_array + array_from_pivot_to_end

        return sorted_array
        # this is for sure up to you, but you can actually be using the langauge to do a lot more work for you.  Instead of defining the pivot's position, you can 
        # actually select a pivot value, and then do something like:
        # lhs = quicksort([x for x in array if x < pivot_value])
        # middle = [x for x in array if x == pivot_value]
        # rhs = quicksort([x for x in arrray if x > pivot_value])
        # return lhs + middle + rhs
        # I like this method because it makes it _pretty clear_ what the fundamental operating mechanism of quicksort is:
        # You're just filtering the list at each level.  Making it explicit like this actually robs quicksort of part of
        # what makes it fast - quicksort is really _really_ quick as an in-place sorting algorithm, it looses some oomph
        # when you're copying and merging lists.


test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]

print(quicksort(test))
