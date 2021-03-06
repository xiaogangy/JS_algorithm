/**
 * @desc 写一个函数，求两个整数之和，要求在函数体内不得使用“+”，“-”，“*”，“/”四则运算符号。
 *
 * 考察点：位运算
 * 思路：我们常常以为四则运算就是最最基础的算术运算了，但是在计算机底层并没有采用这种运算方法。我记得读书时候计算机组成原理上讲到计算机底层里是只有一种加法运算的，所有其他的运算都是用这个
 * 加法运算变形来的。那么问题来了，计算机底层是只识别二进制的01的，它们是如何进行加法减法的呢？如果计组还记得一些，就知道这道题用位运算可以轻松解决了。
 * 我们先来设想一下四则运算中我们是如何做的，比如5+17，我们是在每次进位的时候记下来进的位数，然后计算下一位的时候，加上进位，现在不妨把这个步骤拆分一下，保证我们每次只做一件事情。
 * - 第一步，我们先各位相加，但是不进位，这样5+17的结果是12，因为5+7=12，但是没有进位，所以个位余2，十位相加的结果则是1，结果就是12。
 * - 第二步，加上进位的数。在第一步中我们进位在计算最低位的时候进位了，进位的结果是10，这一次要把这个10和上一步的计算结果相加。
 * - 重复上面两步，直到没有进位的数。
 * 现在我们回归到这个题目，我们已经知道了要用二进制来解决这个问题，可不可以仿照一下10进制的运算呢？还是用5和17来做一下模拟，5的二进制表示是101，17的二进制是10001。先按照上面的步骤，第一步做加法，1+1 = 10，
 * 不进位得0，1+0 = 1，0+0 = 0，所以第一步的结果是10100。第二步，取进位，只有在同一个位置都为1的时候才产生进位，在前面的计算中，进位值为10，所以要把10和之前的结果10100相加，结果为10110 = 22。可见，
 * 结果仍然正确。现在我们归纳一下2进制数做加法的步骤：
 * 1. 按位加法：这里用的是按位异或^运算，和上面的加法效果一致
 * 2. 取进位值：用的是按位与&运算，然后再左移一位，才能得到进位得到的值
 * 3. 重复进行以上两个步骤，直到进位值为0
 */

function solution(a, b) {
    // 1. 按位加法
    let result = a ^ b;
    // 2. 取进位
    let carry = (a & b) << 1;
    // 3. 循环判断
    while (carry) {
        // 更新结果
        const temp = result ^ carry;
        // 再次计算进位
        carry = (result & carry) << 1;
        result = temp;
    }
    return result;
}

function testFunc() {
    const a = 5;
    const b = 17;
    console.log(solution(a, b));
}
testFunc();