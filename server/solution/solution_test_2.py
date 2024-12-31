import sys, os
import unittest
import solution
import json
import signal

def timeout_handler(signum, frame):
    print("Test case exceeded time limit")
    raise TimeoutError("Test case exceeded time limit")

class TestMedianSortedArrays(unittest.TestCase):
    def test(self):
        data = open("testcases.json")
        testCases = json.loads(data.read())
        data.close()
        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:
                nums1 = test_case["input"]["nums1"]
                nums2 = test_case["input"]["nums2"]
                expected = test_case["output"]["expected"]

                result = solution.find_median_sorted_arrays(nums1, nums2)
                self.assertEqual(result, expected, f"case=>{nums1}, {nums2} expected=>{expected} Output=>{result}!!!!!")
            except TimeoutError:
                self.fail(f"TLE for test case=>{nums1}, {nums2} expected=>{expected}")
            finally:
                sys.stdout.flush()
                signal.alarm(0)

if __name__ == '__main__':
    try:
        unittest.main()
    except Exception as e:
        print("Test execution stopped due to:", e)
