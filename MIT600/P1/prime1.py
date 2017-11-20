def gen_primes():
    D = {}

    q = 2

    while True:
        if q not in D:
            yield q
            D[q *q] = [q]
        else:
            for p in D[q]:
                D.setdefault(p + q, []).append(p)
            del D[q]

        q += 1

primes = gen_primes()

x = set()
y = 0
a = gen_primes()

while y < 10000:
    x |= set([a.next()])
    y += 1

print ('x contains {:,d} primes'.format(len(x)))
print ('largest is {:,d}'.format(sorted(x)[-1]))

