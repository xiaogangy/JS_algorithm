/**
 * @desc 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得他们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
 *
 * solution1: 哈希表
 * Leetcode上第一题的解题思路，我们顺序遍历数组，然后保存值 => 位置的映射。在遍历每一个数字的时候，我们用s - 当前数值就可以知道complement，用O(1)的时间
 * 就可以判断这个数值是否出现在数组中。这个方法，时间复杂度为O(n)，空间复杂度也为O(n)；
 *
 * solution2：双指针
 * 上面方法没有利用到数组是递增排序的这个特点，我们可以在数组的头部和尾部分别设定一个追踪指针，想一想我们暴力求解的时候，我们是想要把数组中所有的二元序列都访问到，
 * 现在我们的做法是左指针向右移，右指针向左移，我们同样可以达到访问到所有二元序列的要求。只不过这个移动的规则是：
 * - 当左 + 右 > s时，我们将右指针往左移动一个，这样和会减小
 * - 当左 + 右 < s时，我们将左指针往右移动一个，这样和会变大
 * - 当左 + 右 === s时，自然直接返回
 * 以上的方法基于一个前提就是这个数组是递增排序的，我们知道两个数的和为s，那么这两个数一定是其中一个值小一些，另外一个值大一些，所以我们只需要将两个值从两侧开始缩放
 * 就一定可以判断数组中是否存在这样一个序列对。
 *
 */

function solution(array, sum) {
    // 数组里连两个元素都没得，自然就找不到
    if (array.length < 2) {
        return [];
    }

    const result = [];
    // 步入正题
    let start = 0;
    let end = array.length - 1;
    while (start < end) {
        const count = array[start] + array[end];
        if (count === sum) {
            result.push(array[start]);
            result.push(array[end]);
            break;
        } else if (count > sum) {
            // 当前和大于s，右指针要缩小
            end--;
        } else {
            // 当前和小于s，左指针要增大
            start++;
        }
    }

    // 其中包含了找到和未找到的情况
    return result;
}

function testFunc() {
    const numbers = [1, 2, 4, 7, 11, 15];
    const sum = 15;
    console.log(solution(numbers, sum));
}
testFunc();