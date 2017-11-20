def fib(n):
    global numCalls
    numCalls += 1
    print 'fib called with', n
    if n <= 1:
        return n
    else:
        return fib(n-1) + fib(n-2)



