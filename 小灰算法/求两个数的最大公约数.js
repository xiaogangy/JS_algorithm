/**
 * @description 写出一段代码，求出两个数的最大公约数，要求尽量优化算法的性能
 * 解答：两种方法
 * 1. 碾转相除法：两个正整数a和b(a>b)，它们的最大的公约数等于a除以b的余数c和b之间的最大公约数
 * 2. 更相减损术：两个正整数a和b(a>b)，它们的最大的公约数等于a-b的差值c和较小数b之间的最大公约数
 */

/**
 * solution1. 碾转相除法
 * 递归终止条件：直到两个数中一个可以被另外一个整除，最大公约数就是可以整除的那个数
 */
function getGreatestCommonDivision(a, b) {
    let big = a > b ? a : b;
    let small = a < b ? a : b;
    // 写递归，先写终止条件
    if (big % small === 0) {
        return small;
    }
    // 递归
    return getGreatestCommonDivision(big%small, small);
}

/**
 * solution2. 更相减损术
 * 递归终止条件：直到两个数相等，最大公约数就是这个数
 */
function getGreatestCommonDivisionV2(a, b) {
    let big = a > b ? a : b;
    let small = a < b ? a : b;
    // 写递归，先写终止条件
    if (big === small) {
        return small;
    }
    // 递归
    return getGreatestCommonDivisionV2(big-small, small);
}

/**
 * 更相减损术是不稳定的算法，靠两个数求差的方式来递归，运算次数是非常多的，但是众所周知，位移运算的性能非常的好，因此可以做如下改善：
 * 1. 当a和b都是偶数时，gcd(a,b) = 2 * gcd(a/2, b/2) = 2 * gcd(a>>1, b>>1).
 * 2. 当a是偶数，b是奇数时，gcd(a, b) = gcd(a/2, b) = gcd(a>>1, b).
 * 3. 当a是奇数，b是偶数时，gcd(a, b) = gcd(a, b/2) = gcd(a, b>>1).
 * 4. 当a和b都是奇数时，gcd(a, b) = gcd(a-b, b)，此时就又转化成上面的2、3中的情形
 */
function gcd(a, b) {
    // 递归条件终止
    if (a === b) {
        return a;
    }
    // 开始判断各种情况
    if ((a&1) === 0 && (b&1) === 0) {
        return gcd(a>>1, b>>1)<<1;
    } else if ((a&1) === 0 && (b&1) === 1) {
        return gcd(a>>1, b);
    } else if ((a&1) === 1 && (b&1) === 0) {
        return gcd(a, b>>1);
    } else if ((a&1) === 1 && (b&1) === 1) {
        let big = a > b ? a : b;
        let small = a < b ? a : b;
        return gcd(big - small, small);
    }
}

function test() {
    console.log(gcd(25, 5));
    console.log(getGreatestCommonDivisionV2(25, 10));
    console.log(getGreatestCommonDivision(99, 66));
}

test();