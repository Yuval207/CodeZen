from two_sum import twoSum
import unittest

class Test(unittest.TestCase):
    def test_1(self):
        try:
            self.assertEqual(twoSum([1,2,3,4], 7), [2,3])
        except AssertionError:
            print("Fail: 1")
    
    def test_2(self):
        try:
            self.assertEqual(twoSum([2,4,6,9], 15), [2,3])
        except AssertionError:
            print("Fail: 2")

    def test_3(self):
        try:
            self.assertEqual(twoSum([6,9,5,7], 13), [0,3])
        except AssertionError:
            print("Fail: 3")

if __name__ == '__main__':
    unittest.main()
