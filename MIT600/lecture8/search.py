def search(s, e):
    answer = None
    i = 0
    numCompares = 0
    while i < len(s) and answer == None:
        numCompares += 1
        if e == s[i]:
            answer = True
        elif e < s[i]:
            answer = False
        i += 1
    print answer, numCompares
    
def sortedLinearSearch(array, item):
    answer = None
    i = 0
    numCompares = 0
    while i < len(array) and answer == None:
        numCompares += 1
        if item == array[i]:
            answer = True
        # Walking down sorted array
        # If the element is larger than
        # Search it's not there
        elif item < array[i]:
            answer = False
        i += 1
    return answer, numCompares

def bsearch(s, e, first, last):
    print first, last
    if (last - first) < 2: return s[first] == e or s[last]
    mid = first + (last - first) / 2
    if s[mid] == e: return True
    if s[mid] > e: return bsearch(s, e, first, mid - 1)
    return bsearch(s, e, mid + 1, last)

def g(n, m):
    x = 0
    for i in range(n):
        for j in range(m):
            x += 1
    return x

def towers(size, fromStack, toStack, spareStack):
    if size == 1:
        print 'Move disk from ', fromStack, 'to ', toStack
    else:
        towers(size-1, fromStack, spareStack, toStack)
        towers(1, fromStack, toStack, spareStack)
        towers(size-1, spareStack, toStack, fromStack)

