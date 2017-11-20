def fastFib(n, memo):
    global numCalls
    numCalls += 1
    if not n in memo:
        memo[n] = fastFib(n-1, memo) + fastFib(n-2, memo)
    return memo[n]

def fib1(n):
    memo = {0:1, 1:1}
    return fastFib(n, memo)

def maxVal(w, v, i, aW):
    print ('maxVal called with: ', i, aW)
    global numCalls
    numCalls += 1
    if i == 0:
        if w[i] <= aW: return v[i]
        else: return 0
    without_i = maxVal(w, v, i-1, aW)
    if w[i] > aW:
        return without_i
    else:
        with_i = v[i] + maxVal(w, v, i-1, aW - w[i])
    return max(with_i, without_i)

fastFib(10, [])
