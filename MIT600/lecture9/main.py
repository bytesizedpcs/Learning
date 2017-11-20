def bubbleSort(array):
    for j in range(len(array)):
        for i in range(len(array) - 1):
            if array[i] > array[i+1]:
                temp = array[i]
                array[i] = array[i+1]
                array[i+1] = temp
        print array

def bubbleSortImproved(array):
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(array) - 1):
            if array[i] > array[i+1]:
                temp = array[i]
                array[i] = array[i+1]
                array[i+1] = temp
                swapped = True
        print array

def merge(left, right):
    result = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i = i + 1
        else:
            result.append(right[j])
            j = j + 1
    while (i < len(left)):
        result.append(left[i])
        i = i + 1
    while (j < len(right)):
        result.append(right[j])
        j = j + 1
    return result

def mergeSort(array):
    print array
    if len(array) < 2:
        return array[:]
    else:
        middle = len(array) / 2
        left = mergeSort(array[:middle])
        right = mergeSort(array[middle:])
        together = merge(left, right)
        print 'merged', together
        return together
