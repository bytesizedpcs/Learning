import pylab from *
import random, math

def flip_trial(num_flips):
    heads, tails = 0, 0
    for i in xrange(0, num_flips):
        coin = random.randint(0, 1)
        if coin == 0: heads += 1
        else: tails += 1
    return heads, tails

def sim_flips(num_flips, num_trials):
    diffs = []
    for i in xrange(0, num_trials):
        heads, tails = flip_trial(num_flips)
        diffs.append(abs(heads - tails))
    diffs = array(diffs)
    diff_mean = sum(diffs)/len(diffs)

