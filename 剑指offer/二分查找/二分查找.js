/**
 * @desc 二分查找作为最基础的算法之一，一定是得滚瓜烂熟于心的。一般情况下，当我们遇到题目中出现有序数组、查找、统计等字眼的时候，就可以考虑往二分查找，或者
 * 哈希表等结构上寻找解题思路。
 */

/**
 * 二分查找递归版，返回找到的索引
 * @param {*} data 有序数组
 * @param {*} k 待查找元素
 * @param {*} start 区间的起点
 * @param {*} end 区间的终点
 * @return {number} 索引
 */
function binarySearchRecursive(data, k, start, end) {
    if (start > end) {
        return -1;
    }
    // 之所以要写成start + (end - start) >> 1的风格，是防止start + end出现大数溢出
    const middleIndex = start + (end - start) >> 1;
    const middleValue = data[middleIndex];

    if (middleValue === k) {
        // 已找到，直接返回
        return middleIndex;
    } else if (middleValue < k) {
        // 中间值小于k，说明待查找的值在右侧
        start = middleIndex + 1;
    } else {
        // 中间值大于k，说明k值应该在左侧
        end = middleIndex - 1;
    }

    return binarySearch(data, k, start, end);
}

/**
 * 二分查找-非递归版本
 * @param {*} data 待查找数组
 * @param {*} k 待查找元素
 * @param {*} start 查找区间的起点
 * @param {*} end 查找区间的终点
 * @return {number} 索引
 */
function binarySearch(data, k, start, end) {
    if (start > end) {
        return -1;
    }

    // 注意这里的循环判断条件
    while (start <= end) {
        const middleIndex = start + (end - start) >> 1;
        const middleValue = data[middleIndex];
        if (middleValue === k) {
            // 已找到，直接返回
            return middleIndex;
        } else if (middleValue < k) {
            // 中间值小于k，说明待查找的值在右侧
            start = middleIndex + 1;
        } else {
            // 中间值大于k，说明k值应该在左侧
            end = middleIndex - 1;
        }
    }

    return -1;
}

function testFunc() {
    const numbers = [1, 3, 4, 5, 7, 9];
    const start = 0;
    const end = numbers.length - 1;
    const k = 0;
    console.log('递归', binarySearch(numbers, k, start, end));
    console.log('循环', binarySearchRecursive(numbers, k, start, end));
}

testFunc();