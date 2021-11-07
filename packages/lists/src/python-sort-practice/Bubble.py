"""Implement quick sort in Python.
Input a list.
Output a sorted list.

(From Udacity course https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513) """


def bubblesort(array):
    # when doing bubble sort, I often clean it up as a pair of for loops, rather than using while loops:
    # for first_sorted_index in range(len(array) - 1, 0, -1):
    #    for current_postition in range(first_sorted_index):
    # This is strictly sugar for what you're already doing, but it can help clarify the actual number of loops you're making.

    final_index_to_sort = len(array) - 1
    while final_index_to_sort > 0:

        current_position = 0
        while current_position < final_index_to_sort:

            current_value = array[current_position]
            next_value = array[current_position + 1]

            if current_value > next_value:
                # When sorting on an array - especially when doing it in an academic context, I usually introduce a `swap`
                # function with a signature something like (arr, int, int) -> arr.  For in-place algorithms, like this one,
                # I often just use (arr, int, int) -> void.  That would make this section look something like
                # if array[current_position] > array[current_position + 1]
                #   swap(array, current_position, current_position + 1)
                # You could even pull out the next position calculation to make it even more clear:
                #
                # next_position = current_position + 1
                # if array[current_position] > array[next_position]:
                #   swap(array, current_position, next_position)
                
                array[current_position] = next_value
                array[current_position + 1] = current_value

            current_position = current_position + 1

        final_index_to_sort = final_index_to_sort - 1

    return array


test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]
print(bubblesort(test))
