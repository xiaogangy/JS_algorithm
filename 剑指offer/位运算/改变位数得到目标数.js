/**
 * @desc 输入两个整数m和n，计算需要改变m的二进制表示中的多少位才能得到n。
 * 
 * solution:
 * 1. 求m和n的异或
 * 2. 统计异或结果中1的个数
 */

function solution(m, n) {
    let xor = m ^ n;
    let count = 0;
    while (xor) {
        count++;
        xor = xor & (xor - 1);
    }
    return count;
}

console.log(solution(10, 13));