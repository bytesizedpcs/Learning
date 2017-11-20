# Makes prime numbers
#

import re, sys

def isPrime(n):
    return re.match(r'^1?$|^(11+?)\1+$', '1' * n) == None

N = int(sys.argv[1])
M = 100
l = list()

while len(l) < N:
    l += filter(isPrime, range(M - 100, M))
    M += 100

print (l[:N])
