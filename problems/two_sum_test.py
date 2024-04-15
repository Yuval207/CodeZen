# Assume two_sum.py contains the twoSum function
from two_sum import twoSum
import unittest

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(twoSum([1,2,3,4], 7), [2,3])
    
    def test_2(self):
        self.assertEqual(twoSum([2,4,6,9], 15), [2,3])

    def test_3(self):
        self.assertEqual(twoSum([6,9,5,7], 13), [0,3])

if __name__ == '__main__':
    unittest.main()
