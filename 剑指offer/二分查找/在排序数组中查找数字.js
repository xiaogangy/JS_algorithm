/**
 * @desc 数字在排序数组中出现的次数。统计一个数字在排序数组中出现的次数，例如输入数组[1, 2, 3, 3, 3, 3, 4, 5]和数字3，由于3在这个数组中出现了4次，因此输出4。
 *
 * solution1: 遍历
 * 这道题直观的解法很简单，直接顺序遍历一遍数组，就能得到指定数字出现的次数，时间复杂度为O(n)。但是这样的话，没有利用到排序数组这个特点。
 *
 * solution2: 普通二分查找
 * 看到有序数组找数，一定要第一反应就是二分查找。这道题如果用一般的二分查找思路，先找到等于k的元素，然后分别向前和向后遍历，找到这个元素的首尾位置，就能统计出来这个
 * 元素出现的次数，但是该元素可能出现在整个数组中，因此时间复杂度为o(n)。
 *
 * solution3: 找起点和终点的二分查找
 * 在solution2中，我们找到了等于k的元素，然后向前向后找统计k出现的次数，这是主要消耗时间的地方。我们可以尝试找一下k这个元素出现的首尾边界，二者一减再加1就是k出现的次数了。
 * 以找第一个值等于k的元素为例，我们还是用二分查找。我们还是用老套的二分查找套路来找到值等于k的元素，这时候要注意了。我们需要判断一下这个元素左边是不是等于k，如果等于k，
 * 说明第一个k元素还在左边，让right指针等于当前元素index-1；如果左边元素不等于k，那么当前元素就是第一个值为k的元素了。
 *
 */

function getNumberOfK(data, k) {
    if (!data.length) {
        return 0;
    }
    const left = 0;
    const right = data.length - 1;
    const first = getFirstK(data, k, left, right);
    const last = getLastK(data, k, left, right);
    if (first !== -1 && last !== -1) {
        return last - first + 1;
    }
    return 0;
}

/**
 * 在区间[left, right]中找到第一个值为k的元素的位置
 *
 * @param {*} data 数组
 * @param {*} k 待查找元素
 * @param {*} left 左边界
 * @param {*} right 右边界
 * @return {number} 第一个等于k的元素位置
 */
function getFirstK(data, k, left, right) {
    if (left > right) {
        return -1;
    }
    const middle = left + (right - left) >> 1;
    const middleValue = data[middle];

    if (middleValue < k) {
        // 中间值小于k，说明k肯定在右边
        left = middle + 1;
    } else if (middleValue > k) {
        // 中间值大于k，说明k在左边
        right = middle - 1;
    } else {
        // 剩下的当然就是middleValue = k的情况了
        if (middle === 0 || data[middle - 1] !== k) {
            return middle;
        }
        right = middle - 1;
    }

    // 递归查找第一个k出现的位置
    return getFirstK(data, k, left, right);
}

/**
 * 找到最后一个值为k的元素的位置
 *
 * @param {*} data 数组
 * @param {*} k 待查找元素
 * @param {*} left 左边界
 * @param {*} right 右边界
 * @return {number} 最后一个等于k的元素位置
 */
function getLastK(data, k, left, right) {
    if (left > right) {
        return -1;
    }
    const middle = left + (right - left) >> 1;
    const middleValue = data[middle];

    if (middleValue < k) {
        // 中间值小于k，说明k肯定在右边
        left = middle + 1;
    } else if (middleValue > k) {
        // 中间值大于k，说明k在左边
        right = middle - 1;
    } else {
        // 剩下的当然就是middleValue = k的情况了
        if (middle === right || data[middle + 1] !== k) {
            return middle;
        }
        left = middle + 1;
    }

    // 递归查找第一个k出现的位置
    return getLastK(data, k, left, right);
}

function testFunc() {
    const numbers = [1, 2, 3, 3, 3, 3, 4, 5];
    console.log(getNumberOfK(numbers, 3));
}
testFunc();