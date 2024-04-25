def solution(nums, target):
        for i in range(len(nums)):
            print(a)
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j];
        return None

