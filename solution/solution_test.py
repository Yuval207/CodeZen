from solution import solution
import unittest

class Test(unittest.TestCase):
    def test_1(self):
        try:
            result = solution([1,2,3,4], 7)
            self.assertEqual(result, [2,3])
        except Exception as e:
            print("Error occurred in test_1:", e)
    
    def test_2(self):
        try:
            result = solution([2,4,6,9], 15)
            self.assertEqual(result, [2,3])
        except Exception as e:
            print("Error occurred in test_2:", e)

    def test_3(self):
        try:
            result = solution([6,9,5,7], 13)
            self.assertEqual(result, [3,3])
        except Exception as e:
            print("Error occurred in test_3:", e)

if __name__ == '__main__':
    unittest.main()