export const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    companies: ['Google', 'Amazon', 'Facebook', 'Apple'],
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
\`\`\`

### Example 3:

\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:

- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- Only one valid answer exists.

### Follow-up: 
Can you come up with an algorithm that is less than O(n²) time complexity?`,
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
    
}`
  },
  {
    id: 2,
    status: 'attempted',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    companies: ['Microsoft', 'Amazon', 'Facebook'],
    description: '...',
    starterCode: '// Add Two Numbers starter code'
  },
  {
    id: 3,
    status: 'unsolved',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    timeComplexity: 'O(log(m+n))',
    spaceComplexity: 'O(1)',
    companies: ['Google', 'Amazon', 'Microsoft'],
    description: '...',
    starterCode: '// Median of Two Sorted Arrays starter code'
  }
];