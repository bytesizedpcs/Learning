from sys import argv
from time import time
import math

def prime(i, primes):
    for prime in primes:
        if not (i == prime or i % prime):
            return False
    primes.add(i)
    return i

def historic(n):
    primes = set([2])
    i, p = 2, 0
    while True:
        if prime(i, primes):
            p += 1
            if p == n:
                return primes
        i += 1

def naive(n):
    from itertools import count, islice
    primes = (n for n in count(2) if all(n % d for d in range(2, n)))
    return islice(primes, 0, n)

def isPrime(n):
    import re
    return re.match(r'^1?$|^(11+?)\1+$', '1' * n) == None

def regexp(n):
    import sys
    N = int(sys.argv[1])
    M = 100
    l = list()

    while len(l) < N:
        l += filter(isPrime, range(M - 100, M))
        M += 100

    return l[:N]

def logOfPrimes(n):
    primes = historic(n)
    logPrimes = math.log(primes)
    additions = 0
    additions += logPrimes
    print ('n: ', n, 'sums:', additions, 'ratio:', additions/n)

def dotime(func, n):
    print (func.__name__)
    start = time()
    print (sorted(list(func(n))))
    print ('Time in seconds: ' + str(time() - start))

if __name__ == '__main__':
    for func in naive, historic, regexp:
        dotime(func, int(argv[1]))
