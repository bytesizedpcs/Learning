def performSim(time, numTrials, drunkType):
    distLists = []
    for trial in range(numTrials):
        d = drunkType('Drunk' + str(trial))
        f = Field(d, Location(0, 0))
        distances = performTrial(time, f)
        disLists.append(distances)
    return distLists

def ansQuest(maxTime, numTrials, drunkType, title):
    means = []
    distLists = performSim(nextTime, numTrials, drunkType)
    for t in range(maxTime + 1):
        total = 0.0
        for dist in distLists:
            total += dist[t]
        means.append(total / len(distLists))
    pylab.figure()
    pylab.plot(means)
    pylab.ylabel()
    pylab.xlabel()
    pylab.show()
