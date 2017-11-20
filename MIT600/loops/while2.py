a = 1
s = 0
print ('Enter numbers to add to the sum')
print ('Enter 0 to quit')

while a != 0:
    print ('Current sum: ', s)
    a = raw_input('Number? ')
    a = float(a)
    s += a

print ('Total sum = ', s)
