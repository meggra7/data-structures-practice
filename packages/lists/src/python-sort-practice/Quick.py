"""Implement quick sort in Python.
Input a list.
Output a sorted list.

(From Udacity course https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513) """


def quicksort(array):

    if len(array) <= 1:
        return array
    else:
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

        sorted_array.append(array[pivot_index])

        array_from_pivot_to_end = quicksort(array[pivot_index + 1 : len(array)])
        sorted_array = sorted_array + array_from_pivot_to_end

        return sorted_array


test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]

print(quicksort(test))
