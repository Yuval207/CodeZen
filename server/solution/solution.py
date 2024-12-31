import os, sys

def blockPrint():
    sys.stdout = open(os.devnull, 'w')
blockPrint()

def reverse_integer(x: int) -> int:
        # Your code here
        INT_MAX, INT_MIN = 2**31 - 1, -2**31
        reversed_x = 0
        sign = -1 if x < 0 else 1
        x = abs(x)
        
        while x != 0:
            pop = x % 10
            x //= 10
            if reversed_x > INT_MAX // 10 or (reversed_x == INT_MAX // 10 and pop > 7):
                return 0
            reversed_x = reversed_x * 10 + pop
        
        return sign * reverse_x