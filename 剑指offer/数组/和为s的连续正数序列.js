/**
 * @desc 输入一个正数s，打印出所有和为s的连续正数序列（至少含有两个数字）。例如，输入15，由于1+2+3+4+5 = 4+5+6 = 7+8 = 15，所以打印出3个连续序列1~5，4~6和7~8
 *
 * solution1: 双指针
 * 我们仍然可以借鉴和为s的两个数字中的思想，用两个指针来追踪合法序列的区间。以15为例，我们这次初始化的时候，把左指针初始化为1，右指针初始化为2，指针的移动规则：
 * - 当左 + 右 < s，右指针右移一位，和会变大
 * - 当左 + 右 > s，左指针右移一位，和会变小（因为少了一个数字）
 * - 当左 + 右 = s，确定了一组序列，保存起来。
 * - 继续进行如上循环，什么时候终止呢？因为题目要求至少有两个数，所以我们要保证左指针 = (s + 1) / 2 的时候就停止向后遍历
 *
 * solution2: 数学规律
 * 我们知道一段连续的正数序列的和 = (start + end)*n / 2，其中start表示表示序列的起点，end表示序列的终点，n = end - start + 1; 既然我们知道这个规律，不妨分别找一下
 * 这个序列长度为2、3、4……m等情况的序列即可。那么我们如何知道这个m的值呢？我们知道最长的序列一定是以1开始的序列，那么假设终点数字为n，则(1+n)*n/2 = s，注意这个序列不一定存在，
 * 我们只是在这里模拟最长可能出现的情况。那么n等于2s开方的向下取整，设为t。我们主要保证m <= t就可以了。梳理一下：
 * - n从2开始取值，一直取值到t
 * - 针对某个个数m，我们知道可以带入公式求出a和b的值，自然就可以判断区间（原谅我多年不做数学，这个初中知识让我算了一阵子……）
 */

/**
 * 这里使用了solution1的方法，笨是笨了点，但是没涉及到数学知识
 * @param {*} sum 和
 * @return {Array} 所有序列
 */
function solution(sum) {
    // 健壮性
    if (sum <= 2) {
        return [];
    }

    // 步入正题
    // 保存所有可能的序列
    const result = [];
    let start = 1;
    let end = 2;
    // 循环停止的条件
    const stop = (sum + 1) >> 1;

    while (start < stop) {
        const currentCount = (start + end) * (end - start + 1) / 2;
        if (currentCount === sum) {
            // 如果找到了一个符合要求的序列
            const sequence = [];
            for (let i = start; i <= end; i++) {
                sequence.push(i);
            }
            result.push(sequence);
            // 一定不要忘了这个：即使找见了一组，还是要继续找
            start++;
        } else if (currentCount < sum) {
            // 当前序列和小于sum，则右指针要右移
            end++;
        } else if (currentCount > sum) {
            // 当前序列和大于sum，则左指针要右移
            start++;
        }
    }

    return result;
}

function testFunc() {
    const sum = 15;
    console.log(solution(sum));
}
testFunc();