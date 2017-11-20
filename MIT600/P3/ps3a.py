# Problem 1

# take string, run find
# for every true return
# add one to count
# loop through string, or remove index
def countSubStringMatchCheat(target, key):
    return len(target.split(key)) - 1

def countSubStringMatchRecursive(target, key):
    count = 0
    nextMatch = target.find(key)
    # Base case
    if nextMatch == -1:
        return count
    else:
        count = 1 + countSubStringMatchRecursive(target[nextMatch+1:], key)
        return count

def countSubStringMatch(target, key):
    count = 0
    start = 0
    returnValue = 0
    while returnValue != -1:
        count += 1
        returnValue = target.find(key, start)
        start = returnValue + 1
    return count - 1



target1 = 'atgacatgcacaagtatgcat'
target2 = 'atgaatgcatggatgtaaatgcag'

key10 = 'a'
key11 = 'atg'
key12 = 'atgc'
key13 = 'atgca'

print (countSubStringMatchRecursive(target1, key10))
print (countSubStringMatchRecursive(target2, key13))
