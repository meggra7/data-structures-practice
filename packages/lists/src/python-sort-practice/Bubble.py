"""Implement quick sort in Python.
Input a list.
Output a sorted list.

(From Udacity course https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513) """


def bubblesort(array):

    final_index_to_sort = len(array) - 1
    while final_index_to_sort > 0:

        current_position = 0
        while current_position < final_index_to_sort:

            current_value = array[current_position]
            next_value = array[current_position + 1]

            if current_value > next_value:
                array[current_position] = next_value
                array[current_position + 1] = current_value

            current_position = current_position + 1

        final_index_to_sort = final_index_to_sort - 1

    return array


test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]
print(bubblesort(test))
