/**
 * @desc 在一个数组中除一个数字只出现了一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
 *
 * solution1：哈希表
 * 哈希表是这道题最直观的解法，时间复杂度为O(n)，但是空间复杂度也是O(n)。
 * solution2：找规律
 * 如果一个数字出现了3次，那么它的二进制表示的每一位（0或者1）也出现3次，如果把所有的出现三次的数字的二进制表示的每一位都分别加起来，那么每一位的和都能被3整除。
 * 如果我们把数组中所有数字的二进制表示的每一位都加起来，如果某一位能被3整除，则那个只出现一次的数字二进制表示中对应的那一位就是0，否则就是1.
 *
 */

function solution(array) {
    if (!array.length) {
        return null;
    }

    const count = new Array(32).fill(0);
    // 双层循环，外层循环用来控制array的数字，内层循环控制每个数字不同的位数
    for (let i = 0; i < array.length; i++) {
        const number = array[i];
        let bitMask = 1;
        // 这种方法只能用于找到那个出现一次的数字，是用32位能表示的数字
        for (let j = 31; j >= 0; j--) {
            let bit = number & bitMask;
            if (bit) {
                count[j] += 1;
            }
            bitMask = bitMask << 1;
        }
    }
    const result = [];
    // 遍历统计数组，从而得到待找数字的每一位
    for (let i = 0; i < count.length; i++) {
        result.push(count[i] % 3);
    }

    const str = result.join('');
    return parseInt(str, 2);
}

function testFunc() {
    const numbers = [2, 2, 2, 4, 4, 4, 8];
    console.log(solution(numbers));
}
testFunc();