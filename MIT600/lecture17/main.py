####
import random

class CompassPt(object):
    possibles = ('N', 'S', 'E', 'W')

    def __init__(self, pt):
        if pt in self.possibles: self.pt = pt
        else: raise ValueError('In CompassPt.__init__')

    def move(self, dist):
        if self.pt == 'N': return (0, dist)
        elif self.pt == 'S': return (0, -dist)
        elif self.pt == 'E': return (dist, 0)
        elif self.pt == 'W': return (-dist, 0)
        else: raise ValueError('in CompassPt.move')

class Field(object):
    def __init__(self, drunk, loc):
        self.drunk = drunk
        self.loc = loc

    def move(self, cp, dist):
        oldLoc = self.loc
        xc, yc = cp.move(dist)
        self.loc = oldLoc.move(xc, yc)

    def getLoc(self):
        return self.loc

    def getDrunk(self):
        return self.drunk

class Drunk(object):
    def __init__(self, name):
        self.name = name

    def move(self, field, time = 1):
        if field.getDrunk() != self:
            raise ValueError('Drunk.move called with drunk not in field')
        for i in range(time):
            pt = CompassPt(random.choice(CompassPt.possibles))
            field.move(pt, 1)

def performTrial(time, f):
    start = f.getLoc()
    distances = [0.0]
    for t in range(1, time + 1):
        f.getDrunk().move(f)
        newLoc = f.getLoc()
        distance = newLoc.getDist(start)
        distances.append(distance)
    return distances

