export const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Google", "Amazon", "Facebook", "Apple"],
    description: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers in the array such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
Explanation: nums[1] + nums[2] == 6, we return [1, 2].
\`\`\`

### Example 3:

\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
Explanation: nums[0] + nums[1] == 6, we return [0, 1].
\`\`\`

### Constraints:

- 2 <= nums.length <= 10^4
- 10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
}`,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Microsoft", "Amazon", "Facebook"],
    description: `# Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Example 1:

\`\`\`
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
\`\`\`

### Example 2:

\`\`\`
Input: l1 = [0], l2 = [0]
Output: [0]
Explanation: Both lists represent the number 0.
\`\`\`

### Example 3:

\`\`\`
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
Explanation: 9999999 + 9999 = 10009998.
\`\`\`

### Constraints:

- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.`,
    starterCode: `/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Write your code here
}`,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, a))",
    companies: ["Google", "Amazon", "Microsoft"],
    description: `# Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without repeating characters.

### Example 1:

\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

### Example 2:

\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

### Example 3:

\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is not valid.
\`\`\`

### Constraints:

- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols, and spaces.`,
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your code here
}`,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    timeComplexity: "O(log(m+n))",
    spaceComplexity: "O(1)",
    companies: ["Google", "Amazon", "Microsoft"],
    description: `# Median of Two Sorted Arrays

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

### Example 1:

\`\`\`
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
Explanation: merged array = [1,2,3] and median is 2.0.
\`\`\`

### Example 2:

\`\`\`
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.5
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
\`\`\`

### Example 3:

\`\`\`
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.0
Explanation: Both arrays are merged as [0,0,0,0], and the median is 0.
\`\`\`

### Constraints:

- nums1.length == m
- nums2.length == n
- 0 <= m, n <= 1000
- -10^6 <= nums1[i], nums2[i] <= 10^6`,
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
}`,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    description: `# Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

### Example 1:

\`\`\`
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
\`\`\`

### Example 2:

\`\`\`
Input: s = "cbbd"
Output: "bb"
\`\`\`

### Example 3:

\`\`\`
Input: s = "a"
Output: "a"
Explanation: Single character strings are palindromes.
\`\`\`

### Constraints:

- 1 <= s.length <= 1000
- s consist of only digits and English letters.`,
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // Write your code here
}`,
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Google", "Microsoft", "Facebook"],
    description: `# Zigzag Conversion

Given a string s and an integer numRows, arrange the string in a zigzag pattern on a given number of rows. After that, read the rows line by line to produce the output string.

### Example 1:

\`\`\`
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Explanation:
P   A   H   N
A P L S I I G
Y   I   R
\`\`\`

### Example 2:

\`\`\`
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
\`\`\`

### Example 3:

\`\`\`
Input: s = "A", numRows = 1
Output: "A"
\`\`\`

### Constraints:

- 1 <= s.length <= 1000
- s consists of only English letters (lowercase and uppercase), ',' and '.'.
- 1 <= numRows <= 1000`,
    starterCode: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    // Write your code here
}`,
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    timeComplexity: "O(log(x))",
    spaceComplexity: "O(1)",
    companies: ["Google", "Amazon", "Microsoft"],
    description: `# Reverse Integer

Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, return 0.

### Example 1:

\`\`\`
Input: x = 123
Output: 321
\`\`\`

### Example 2:

\`\`\`
Input: x = -123
Output: -321
\`\`\`

### Example 3:

\`\`\`
Input: x = 120
Output: 21
\`\`\`

### Constraints:

- -2^31 <= x <= 2^31 - 1`,
    starterCode: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    // Write your code here
}`,
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google"],
    description: `# String to Integer (atoi)

Implement the \`myAtoi(string s)\` function, which converts a string to a 32-bit signed integer.

The algorithm for \`myAtoi(string s)\` is as follows:
1. Read in and ignore any leading whitespace.
2. Check if the next character is '-' or '+'. Determine the sign of the number.
3. Read in the characters until the next non-digit or the end of the input.
4. Convert these digits into an integer.
5. Clamp the integer within the 32-bit signed integer range.
6. Return the integer.

### Example 1:

\`\`\`
Input: s = "42"
Output: 42
\`\`\`

### Example 2:

\`\`\`
Input: s = "   -42"
Output: -42
Explanation: The string starts with whitespace and then a '-' so it is negative.
\`\`\`

### Example 3:

\`\`\`
Input: s = "4193 with words"
Output: 4193
Explanation: The conversion stops at the first non-digit character.
\`\`\`

### Constraints:

- 0 <= s.length <= 200
- s consists of English letters, digits, spaces, and signs (+ or -).`,
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    // Write your code here
}`,
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    timeComplexity: "O(log(x))",
    spaceComplexity: "O(1)",
    companies: ["Google", "Amazon", "Facebook"],
    description: `# Palindrome Number

Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a palindrome when it reads the same backward as forward.

### Example 1:

\`\`\`
Input: x = 121
Output: true
\`\`\`

### Example 2:

\`\`\`
Input: x = -121
Output: false
Explanation: Reading backwards gives "121-", which is not the same as "-121".
\`\`\`

### Example 3:

\`\`\`
Input: x = 10
Output: false
Explanation: Reading backwards gives "01", which is not the same as "10".
\`\`\`

### Constraints:

- -2^31 <= x <= 2^31 - 1`,
    starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Write your code here
}`,
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Google", "Facebook", "Microsoft"],
    description: `# Regular Expression Matching

Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for '.' and '*'.

### Example 1:

\`\`\`
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
\`\`\`

### Example 2:

\`\`\`
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of 'a'.
\`\`\`

### Example 3:

\`\`\`
Input: s = "mississippi", p = "mis*is*p*."
Output: false
\`\`\`

### Constraints:

- 1 <= s.length <= 20
- 1 <= p.length <= 30
- s contains only lowercase English letters.
- p contains only lowercase English letters, '.', and '*'.`,
    starterCode: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
    // Write your code here
}`,
  },
];
