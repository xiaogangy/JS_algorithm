/**
 * @description 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
 *
 * 思路：用F(n)表示n级台阶的跳法，那么青蛙在第一次跳的时候，可以选择跳1级，跳2级，……，跳n级
 * 那么可以得到公式F(n) = F(n-1) + F(n-2) + …… + F(1) + F(0)
 * 同理，可以得到F(n-1) = F(n-2) + F(n-3) + …… + F(1) + F(0)
 * 上面两个公式相减，再移位可以得到F(n) = 2*F(n-1);
 * 那么起始情况是啥呢？n为1的时候，只有1种情况，n为2的时候，有2种情况，进而可以得到公式F(n) = 2 ^ (n - 1)
 */

function solution(n) {
    return Math.pow(2, n - 1);
}