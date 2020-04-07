/**
 * @description 如何判断一个数是否是2的整数次幂
 * solution:
 * - 一个数如果是2的幂，那么它的二进制数最高位为1，其余位置全为0
 * - 这个数减去1，则所有位都为1
 */

function solution(m) {
    // 按位与的值为0， 则说明m是2的幂次方
    return (m & (m - 1)) === 0;
}

console.log('24是吗？', solution(24));
console.log('1024是吗？', solution(1024));