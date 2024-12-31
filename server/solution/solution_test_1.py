import sys, os
import unittest
import solution
import json
import signal

def timeout_handler(signum, frame):
    print("Test case exceeded time limit")
    raise TimeoutError("Test case exceeded time limit")

class TestTwoSum(unittest.TestCase):
    def test(self):
        data=open("testcases.json")
        testCases=json.loads(data.read())
        data.close()
        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:
                nums = test_case["input"]["nums"]
                target = test_case["input"]["target"]
                expected = test_case["output"]["expected"]

                result=solution.solution(nums, target)
                if (type(result)==list):
                    result=sorted(result)
                self.assertEqual(result, sorted(expected), "case=>"+str(nums)+" expected=>"+ str(expected)+" Output=>"+str(result)+"!!!!!")
            except TimeoutError:
                self.fail("TLE for test case=>"+str(nums)+" expected=>"+ str(expected))
            finally:
                sys.stdout.flush() 
                signal.alarm(0)  # Reset the alarm

if __name__ == '__main__':
    try:
        unittest.main()
    except Exception as e:
        print("Test execution stopped due to:", e)