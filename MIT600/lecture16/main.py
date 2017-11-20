class Person(object):
    def __init__(self, last_name, first_name):
        self.last_name = last_name
        self.first_name = first_name

    def lastName(self):
        return self.last_name

    def firstName(self):
        return self.first_name

    def __cmp__(self, other):
        return cmp((self.last_name, self.first_name),
                   (other.last_name, other.first_name))

    def __str__(self):
        return '<Person: %s %s>' %(self.first_name, self.last_name)

    def say(self, to_whom, something):
        return self.first_name + 
