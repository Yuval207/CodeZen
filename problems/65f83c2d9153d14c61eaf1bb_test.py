from solution import solution
import unittest

class Test(unittest.TestCase):
    def test_1(self):
        try:
            self.assertEqual(solution([1,2,3,4], 7), [1,3])
        except AssertionError:
            print(1)
    
    def test_2(self):
        try:
            self.assertEqual(solution([2,4,6,9], 15), [2,3])
        except AssertionError:
            print(2)

    def test_3(self):
        try:
            self.assertEqual(solution([6,9,5,7], 13), [3,3])
        except AssertionError:
            print(3)

if __name__ == '__main__':
    unittest.main()
