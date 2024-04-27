import os
import resource
import signal
import time
from solution import solution
import unittest

class CustomError(Exception):
    pass

class Test(unittest.TestCase):
    def test_1(self):
        try:
            result = self.run_with_limits(solution, ([1,2,3,4], 7), time_limit=3, memory_limit=3*1024*1024)  # 3 MB memory limit
            self.assertEqual(result, [2,3])
        except TimeoutError:
            raise CustomError("Time Limit Exceeded in test_1")
        except MemoryError:
            raise CustomError("Memory Limit Exceeded in test_1")
        except Exception as e:
            print("Error occurred in test_1:", e)
    
    def test_2(self):
        try:
            result = self.run_with_limits(solution, ([2,4,6,9], 15), time_limit=3, memory_limit=3*1024*1024)  # 3 MB memory limit
            self.assertEqual(result, [2,3])
        except TimeoutError:
            raise CustomError("Time Limit Exceeded in test_2")
        except MemoryError:
            raise CustomError("Memory Limit Exceeded in test_2")
        except Exception as e:
            print("Error occurred in test_2:", e)

    def test_3(self):
        try:
            result = self.run_with_limits(solution, ([6,9,5,7], 13), time_limit=3, memory_limit=3*1024*1024)  # 3 MB memory limit
            self.assertEqual(result, [3,3])
        except TimeoutError:
            raise CustomError("Time Limit Exceeded in test_3")
        except MemoryError:
            raise CustomError("Memory Limit Exceeded in test_3")
        except Exception as e:
            print("Error occurred in test_3:", e)

    def run_with_limits(self, function, args, time_limit, memory_limit):
        # Set memory limit
        resource.setrlimit(resource.RLIMIT_AS, (memory_limit, memory_limit))

        # Start the timer
        start_time = time.time()

        # Set up signal handler for time limit
        def signal_handler(signum, frame):
            raise TimeoutError("Function execution time exceeded")

        signal.signal(signal.SIGALRM, signal_handler)
        signal.alarm(time_limit)

        # Run the function
        result = function(*args)

        # Clear the signal alarm
        signal.alarm(0)

        # Check memory usage
        memory_usage = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
        if memory_usage > memory_limit:
            raise MemoryError("Function exceeded memory limit")

        return result

if __name__ == '__main__':
    try:
        unittest.main()
    except CustomError as e:
        print("Test execution stopped due to:", e)
