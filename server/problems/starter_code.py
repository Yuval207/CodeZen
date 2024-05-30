import os, sys

def blockPrint():
    sys.stdout = open(os.devnull, 'w')
blockPrint()

