/**
 * @desc 给定一个数字，我们按照如下规则把它翻译成字符串：0翻译成“a”，1翻译成“b”，……，11翻译成”l“，……，25翻译成”z“。一个数字可能有多种翻译。
 * 例如，12258有5种不同的翻译，分别是”bccfi“，”bwfi“，”bczi“，”mcfi“和”mzi“。请实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 *
 * 思路：我们先分析一下12258这个数字是如何翻译的。我们可以先取第1位数字1，剩下2258这个数字；也可以先取12这两位翻译，然后剩下258这个数字。
 * 这就出现了递归，2258和258可以继续使用同样的规则来进行翻译。但是在翻译2258的时候，我们发现要翻译子问题258，这就出现了重叠子问题，所以这道题
 * 是一道动态规划的题目，我们可以用自底向上的方法进行计算。首先来写一下状态转移方程：记f(i)为字符串从第i位开始可以翻译的成的字符串输入
 * f(i) = f(i+1) + g(i, i+1) * f(i+2);  其中g(i, i+1)是一个系数，当第i位和第i+1位的数字合起来可以翻译为一个字符时，等于1，否则等于0；
 *
 * 编外话：遇到递归问题，还是要都分析一下递归出口。这道题如果是递归写法的话，递归出口是：以i开始的剩余字符串长度，为0、1、2三种情况
 */

function translation(number) {
    // 先来个健壮性测试
    if (number < 0) {
        return 0;
    }
    // 把数字转为整数数组，方便翻译
    const str = String(number).split('').map(i => +i);
    const count = core(str);

    return count;
}

/**
 * 根据整数数字，翻译成的字符串数量
 * 因为是自底向上分析，我们这里其实是从数组自右往左翻译
 * @param {*} arr 待翻译的整数数组
 * @return {number} 返回可以翻译成的数量
 */
function core(arr) {
    // 健壮性
    if (!arr.length) {
        return 0;
    }

    const length = arr.length;
    // 因为是自底向上翻译，所以自然需要一个数组保存从第i为开始可以翻译的数量
    const counts = new Array(length).fill(0);
    // 当前以i开始的字符串可以翻译的数量
    let count = 0;

    // 因为是倒着翻译，所以从最后一位开始翻译
    for (let i = length - 1; i >= 0; i--) {
        // 如果是最后一位，自然只有一种情况
        if (i === length - 1) {
            count = 1;
            counts[i] = count;
            continue;
        }
        // 以下是i不是最后一位数字的情况
        // 1) 先取f(i+1)
        count = counts[i + 1];
        // 2) 再取f(i+2)，但是这时候要分情况，i是不是位于倒数第二位
        const val = 10 * arr[i] + arr[i + 1];
        if (val >= 10 && val <= 25) {
            // i当前刚好处于倒数第二位
            if (i === length - 2) {
                count = count + 1;
            } else {
                count = count + counts[i + 2];
            }
        }
        counts[i] = count;
    }

    return counts[0];
}

function testFunc() {
    const number = 12258;
    console.log(translation(number));
}
testFunc();