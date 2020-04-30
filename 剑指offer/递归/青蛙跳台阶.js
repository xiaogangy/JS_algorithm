/**
 * @description 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 *
 * 思路：可以有两种思考方式：
 * 1. F(n)表示n级台阶总共有的跳法，那么青蛙第一次跳的时候，可以选择跳1级，或者跳两级，总共就这两种情况。第一次跳1级时，还剩下n-1级台阶，跳法为F(n-1)，同理，第一次跳2级时，跳法为F(n-2)
 * 因此可以得到F(n) = F(n-1) + F(n-2);
 * 2. 第二种思路，F(n)仍然表示n级台阶总共的跳法。那么青蛙在跳最后一次的时候，可以是通过跳了1级到达的，也可以是通过跳了2级到达的。同理也可以得到公式：F(n) = F(n-1) + F(n-2)
 * 仔细看这个公式，会发现，这就是斐波那契数列，所以解法和斐波那契数列一模一样。但是，注意，和斐波那契数列的起始值不一样！
 */

/**
 * 这里就不用递归写了，写个循环练手
 * @param {*} n 台阶数量
 */
function solution(n) {
    if (n <= 0) {
        return 0;
    }
    // 1级台阶有1种跳法，2级台阶有2种跳法
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    let first = 1;
    let second = 2;
    let result = 0;
    for (let i = 3; i <= n; i++) {
        result = first + second;
        first = second;
        second = result;
    }
    return result;
}

console.log(solution(0));
console.log(solution(5));
console.log(solution(7));