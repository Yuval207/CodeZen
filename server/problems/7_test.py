import sys, os
import unittest
import solution
import json
import signal

def timeout_handler(signum, frame):
    print("Test case exceeded time limit")
    raise TimeoutError("Test case exceeded time limit")

class TestReverseInteger(unittest.TestCase):
    def test(self):
        data = open("testcases.json")
        testCases = json.loads(data.read())
        data.close()
        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:
                x = test_case["input"]["x"]
                expected = test_case["output"]["expected"]

                result = solution.reverse_integer(x)
                self.assertEqual(result, expected, f"case=>{x} expected=>{expected} Output=>{result}!!!!!")
            except TimeoutError:
                self.fail(f"TLE for test case=>{x} expected=>{expected}")
            finally:
                sys.stdout.flush()
                signal.alarm(0)

if __name__ == '__main__':
    try:
        unittest.main()
    except Exception as e:
        print("Test execution stopped due to:", e)
