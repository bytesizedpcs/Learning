#Problem 2
from string import *

def subStringMatchExact(target, key):
    index_array = []
    start = 0
    while target.find(key, start) != -1:
        start = target.find(key, start)
        index_array.append(start)
        start += 1
    return index_array

def constrainedMatchPair(first_match, second_match, length):
    answer = []
    for i in first_match:
        for j in second_match:
            if i + length + 1 == j:
                answer.append(i)
    return answer

def subStringMatchExactlyOneSub(target, key):
    possible_answer = subStringMatchExactlyOneSub(key, target)
    answer = possible_answer
    perfect_matches = subStringMatchExact(target, key)
    to_remove_from_answer = []

    for i in range(0, len(possible_answer)):
        for j in range(0, len(perfect_matches)):
            if possible_answer[i] == perfect_matches[j]:
                to_remove_from_answer.append(i)
                
    for m in reversed(to_remove_from_answer):
        answer = answer[:m] + answer [m+1:]
    
    return answer

target1 = 'atgacatgcacaagtatgcat'
target2 = 'atgaatgcatggatgtaaatgcag'

key10 = 'a'
key11 = 'atg'
key12 = 'atgc'
key13 = 'atgca'

print(subStringMatchExact(target1, key10))
print(subStringMatchExact(target2, key12))
