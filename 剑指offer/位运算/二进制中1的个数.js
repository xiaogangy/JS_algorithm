/**
 * @desc 请实现一个函数，输入一个整数，输出该二进制表示中1的个数。例如把9表示成二进制是1001，有2位是1，因此输出为2
 *
 * 思路：JS的位运算有很多的trick，建议看一下目录一些思路中的JS中的number类型
 * 这里其实就有个坑，JS进行位运算时，会把数字截断为32位有符号整形，那么这就意味着如果待判断的数字超过了32位，其实是没办法计算超过32位以后的那些1的。
 * 所以注意如果题目中提到是特别大的数，其实可以考虑用字符串或者高位运算的方法解决。
 */

/**
 * 第一种解法，判断数字的最右边一位是不是为1，然后不断的右移，直到这个数变为0
 * @param {*} n 输入数字
 * @return {number} 1的个数
 */
function solution1(n) {
    let count = 0;
    while (n) {
        if (n & 1) {
            ++count;
        }
        // 注意这里进行的是无符号右移，如果使用有符号右移">>"，对于负数右移一位，高位会补充1，不用无符号右移会造成死循环
        n = n >>> 1;
    }
    return count;
}

/**
 * 将1不断的左移，与n每个位置的值都进行比较，直到1变为0（即超过了最大位运算的值）.
 * @param {*} n 输入数字
 * @return {number} 1的个数
 */
function solution2(n) {
    let count = 0;
    let flag = 1;
    while (flag) {
        if (flag & n) {
            ++count;
        }
        flag = flag << 1;
    }
    return count;
}

/**
 * 把一个整数减去1，再和原来的整数做与运算，会把该整数最右边的1变为0。那么一个整数的二进制表示中有多少个1，就可以进行多少次这样的操作
 * 负数和正数都是这样的规律
 * @param {*} n 输入数字
 * @return {number} 1的个数
 */
function solution3(n) {
    let count = 0;
    while (n) {
        ++count;
        n = n & (n - 1);
    }
    return count;
}