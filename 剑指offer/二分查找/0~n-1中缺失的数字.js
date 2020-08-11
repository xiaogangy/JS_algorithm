/**
 * @desc 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0~n-1之间。在范围0~n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
 *
 * solution1：加和求差
 * 在小灰算法中出现过类似的题目，寻找缺失的整数。我们可以先把0~n-1中的所有数字和求出来，然后再求出当前数组所有数字的的和，然后二者相减，就可以得到缺失的整数。这样的
 * 方法，时间复杂度为O(n)，而且没有有效利用数组是有序的这一特点。
 *
 * solution2: 二分查找
 * 因为数组是排序了的，而且范围是0~n-1，如果没有缺失的这个整数，那么每个元素的值和它的位置是一样的，但是现在缺失了一个值，我们记假设值m缺失了。那么小于m的值，索引
 * 和值肯定是相等的，但是m的值，肯定是不等的。所以这道题就变为查找数组中第一个值与索引不相等的元素，这样就又变为二分查找。同样的，我们为了找到第一个，当找到一个值与
 * 索引不相等的元素时，还是要判断它左边的位置是否也满足值与索引不等，如果相等，则当前位置就是缺失了的那个元素。
 *
 */

 /**
  * 查找缺失的数字
  * @param {*} data 待查找的数组
  * @return {number} 缺失的数字
  */
function findLostNumber(data) {
    const length = data.length;
    if (!length) {
        return -1;
    }

    let start = 0;
    let end = length - 1;

    while (start <= end) {
        let middleIndex = start + (end - start) >> 1;
        let middleValue = data[middleIndex];

        if (middleValue !== middleIndex) {
            // 要注意一下当前元素是数组第一个元素的情况
            if (middleIndex === 0 || data[middleIndex - 1] === middleIndex - 1) {
                return middleIndex;
            }
            end = middleIndex - 1;
        } else {
            start = middleIndex + 1;
        }
    }

    // 一定要注意这种情况，缺失的值是最后一个元素
    if (start === length) {
        return start;
    }

    return -1;
}

function testFunc() {
    // 取值区间为0~5
    const test1 = [1, 2, 3, 4, 5];
    const test2 = [0, 1, 2, 3, 4];
    const test3 = [0, 1, 3, 4, 5];
    console.log(findLostNumber(test1));
    console.log(findLostNumber(test2));
    console.log(findLostNumber(test3));
}
testFunc();