import datetime as date

def create_genesis_block():
    return Block(0, date.datetime.now(), 'Genesis Block', '0')
