import sys, os
import unittest
import solution
import json
import signal

def timeout_handler(signum, frame):
    print("Test case exceeded time limit")
    raise TimeoutError("Test case exceeded time limit")

class TestZigzagConversion(unittest.TestCase):
    def test(self):
        data = open("testcases.json")
        testCases = json.loads(data.read())
        data.close()
        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:
                s = test_case["input"]["s"]
                numRows = test_case["input"]["numRows"]
                expected = test_case["output"]["expected"]

                result = solution.convert_zigzag(s, numRows)
                self.assertEqual(result, expected, f"case=>{s}, {numRows} expected=>{expected} Output=>{result}!!!!!")
            except TimeoutError:
                self.fail(f"TLE for test case=>{s}, {numRows} expected=>{expected}")
            finally:
                sys.stdout.flush()
                signal.alarm(0)

if __name__ == '__main__':
    try:
        unittest.main()
    except Exception as e:
        print("Test execution stopped due to:", e)
