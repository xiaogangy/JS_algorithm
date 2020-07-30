/**
 * @desc 求1+2+……+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句
 *
 * solution：正常情况下求解1+2+……+n，无外乎公式n(n+1)/2，循环叠加数值求和等。但是这些方法都不能用，我们可以考虑用递归来解决，1+2+……+n的结果等于n + (1+2+……+n-1)，
 * 但是递归的出口我们一般是用一个条件判断，这里显然也不合适。在JS中可以执行条件判断的还有一种取巧的方法，那就是 && 与运算，我们用这个特性来做递归出口的判断。
 *
 */

function sum(n) {
    return n && (n + sum(n - 1));
}

function testFunc() {
    const n = 100;
    console.log(sum(n));
}
testFunc();