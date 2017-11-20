list = [4, 5, 7, 8, 1, 0, 7, 10]
list.sort()
prev = list[0]

del list[0]

for item in list:
    if prev == item:
        print 'Duplicate of ', prev, ' found'
    prev = item
