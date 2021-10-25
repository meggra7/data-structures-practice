"""Implement quick sort in Python.
Input a list.
Output a sorted list.

(From Udacity course https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513) """


def mergesort(array):

    if len(array) > 1:

        # Get midpoint
        midpoint = int(len(array) / 2)

        # Split array in two to continue sorting
        left_array = mergesort(array[:midpoint])
        right_array = mergesort(array[midpoint:])

        # Combine halves back into one for return
        combined_array = []
        left_pointer = 0
        right_pointer = 0

        # While values remain in both halves:
        while left_pointer < len(left_array) and right_pointer < len(right_array):

            # Compare values from both and add smallest:
            if left_array[left_pointer] < right_array[right_pointer]:
                combined_array.append(left_array[left_pointer])
                left_pointer += 1
            else:
                combined_array.append(right_array[right_pointer])
                right_pointer += 1

        # While values remain in left half only, add remaining left values:
        while left_pointer < len(left_array):
            combined_array.append(left_array[left_pointer])
            left_pointer += 1

        # While values remain in right half only, add remaining right values:
        while right_pointer < len(right_array):
            combined_array.append(right_array[right_pointer])
            right_pointer += 1

        return combined_array

    else:
        return array


test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]
print(mergesort(test))
