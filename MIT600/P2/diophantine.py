def dio(a, b, c, target):
    aCount = 0
    bCount = 0
    cCount = 0
    totalNumber = 0
    while totalNumber < target:
        aCount += 1
        totalNumber += a
        if totalNumber > target:
            totalNumber = 0
            bCount += 1
            aCount = 0
            totalNumber += b * bCount
        if totalNumber > target and bCount > 1:
            totalNumber = 0
            cCount += 1
            bCount = 0
            totalNumber += c * cCount
    print (aCount, 'a +', bCount, 'b +', cCount,'c =', target)

array = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65]

for i in array:
    dio(6, 9, 20, i) 
