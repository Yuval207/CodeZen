import os, sys

def blockPrint():
    sys.stdout = open(os.devnull, 'w')
blockPrint()

def solution(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] ==== target:
                return [i, j]
    return None

