/**
 * @desc 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。保证base和exponent不同时为0。
 *
 * 思路：这道题考的其实是代码的完整性，对于我们的算法，测试用例一般要考虑三种情况。
 * - 功能测试用例，即测试是否满足正常的功能
 * - 边界测试用例，可能是循环的边界值或者递归的终结值
 * - 负面测试用例，要考虑各种可能的错误输入用例，保证程序会合理处理这些错误输入而不会崩溃
 */

/**
 * 思考的时候，要考虑指数为负数、0、正数的情况
 * 底数呢？同样要考虑负数、0和正数的情况
 * @param {*} base 底数
 * @param {*} exponent 指数
 * @return {number} 整数次方
 */
function solution(base, exponent) {
    // 指数为0
    if (exponent === 0) {
        return 1; // 这里就不区分base是0还是其他值了，统一都认为任何数的0次方都等于1
    }
    // 指数为1，返回本身
    if (exponent === 1) {
        return base;
    }
    // 首先来说底数的情况，由于我们是逐一相乘，所以没有必要考虑底数正负的情况，只是要特殊注意一下0.
    // 再说指数，指数为0的情况，上面已经处理了。如果指数为正，那就正常计算；如果为负，那么可以先把指数变为正数，计算结果之后再求倒数。
    // 既然要求倒数，这里就存在了分母为0的情况，也就是说如果指数为负数，底数为0时，应该抛出错误.
    if (base === 0 && exponent < 0) {
        throw new Error('底数不能为0');
    }
    // 现在就只考虑可以正常计算的情况了
    const absExponent = exponent < 0 ? -exponent : exponent;

    // 解法1
    // let result = 1;
    // for (let i = 1; i <= absExponent; i++) {
    //     result = result * base;
    // }
    // 解法2
    let result = recursive(base, absExponent);

    if (exponent < 0) {
        result = 1 / result;
    }

    return result;
}

/**
 * 上面的方法虽然满足了基本的功能，但是不够高效，例如如果n等于32，那么for循环中就要迭代32次。
 * 其实我们不需要迭代这么多次，因为一个数的32次方，等于它的16次方的平方，这样在我们求得一个数的16次方后，再做一次运算即可。
 * 那么如果指数是奇数呢，把指数减去1，自然就变成偶数了，先计算偶数次方的值，最后再乘一次奇数即可得到结果。
 * 这种情况下，时间复杂度就降到了O(logn)，我们用递归来求解
 *
 * 注意：这里的代码只是计算exponent为正的情况，只是一个局部函数
 * @param {*} base 底数
 * @param {*} exponent 指数
* @return {number} 整数次方
 */
function recursive(base, exponent) {
    // 指数为0
    if (exponent === 0) {
        return 1; // 这里就不区分base是0还是其他值了，统一都认为任何数的0次方都等于1
    }
    // 指数为1，返回本身
    if (exponent === 1) {
        return base;
    }
    let result = recursive(base, exponent >> 1);
    result = result * result;
    // 如果是奇数，要多乘一个base
    if (exponent & 1) {
        result = result * base;
    }
    return result;
}

console.log(solution(5, -2));