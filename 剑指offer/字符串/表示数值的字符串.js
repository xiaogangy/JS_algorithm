/**
 * @desc 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。
 * 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。
 *
 * 思路：判断字符串是否合法，我们需要先分析合法字符串的一般模式，不符合该模式的，则一律为不合法的字符串。通过简单分析，我们可以得到：
 *              A[.[B]]|[e|EC]或者.B[e|EC]
 * 这是合法字符串的一般模式，其中A为数值的整数部分，B为紧跟着小数点后的数值的小数部分，注意在数值里可能没有整数部分。例如，小数.123等于0.123，
 * 因此A也不是必须的。如果一个数没有整数部分，那么它的小数部分不能为空。A和C都是可能以'+'或者'-'开头的的0~9的数位串，B也是0~9的数位串，但前面
 * 不能有正负号。
 * 判断一个字符串是否符合上述模式时，首先尽可能多的扫描0~9的数位（在起始处可能有'+'或者'-'），也就是前面模式中的表示数值整数的A部分。如果遇到小数点'.'，
 * 再开始扫描表示数值小数部分的B部分，如果遇到'e'或者'E'，则开始扫描表示数值指数的C部分。
 * 注意：这种时候就只用按照合法的字符串模式去扫描，不要考虑各种不符合的情况，否则情况过多.
 *
 * 2020/11/20: 写了个正则表达式来进行验证：/[+-]?((\d*\.\d+)|(\d+\.\d*)|(\d+))(([Ee][+-]?\d+)|(\d+))/g
 */

/**
 * 判断输入字符串是否表示数值
 * @param {*} s 输入字符串
 * @return {boolean} 是否表示数值
 */
function isNumeric(s) {

    const length = s.length;
    // index后续需要作为一个实参来回传递并修改，所以用对象类型来保存吧
    const index = {
        currentIndex: 0
    };
    // 空字符串直接返回false
    if (!length) {
        return false;
    }

    // 1. 判断字符串起始处有没有一个有符号整数
    let isNumeric = scanInteger(s, index);

    // 2. 如果出现'.'，则接下来是数字的小数部分
    if (s[index.currentIndex] === '.') {
        index.currentIndex++;
        // 下面一行代码用||的原因：
        // 1. 小数可以没有整数部分，如.123等于0.123；
        // 2. 小数点后面没有数字，如233.等于233.0；
        // 3. 当然，小数点前面和后面都可以有数字，如233.666
        isNumeric = scanUnsignedInteger(s, index) || isNumeric;
    }

    // 3. 如果出现'e'或者'E'，则接下来是数字的指数部分
    if (s[index.currentIndex] === 'e' || s[index.currentIndex] === 'E') {
        index.currentIndex++;

        // 下面一行代码用&&的原因
        // 1. 当e或E前面没有数字时，整个字符串不能表示数字，如.e1、e1都是不合法的
        // 2. 当e或者E后面没有整数时，整个字符串也不能表示数字，如12e，12e+5.4
        isNumeric = isNumeric && scanInteger(s, index);
    }

    // 这个加&&的原因是排除123asdf这种情况，前面A部分满足了，但是没有进入后面两个if语句
    return isNumeric && index.currentIndex === length;
}

/**
 * 判断字符串从指定索引处开始是否有一个有符号整数
 * @param {*} str 字符串
 * @param {*} index 字符串起始索引
 * @return {boolean} 判断结果
 */
function scanInteger(str, index) {
    let {currentIndex} = index;
    if (str[currentIndex] && (str[currentIndex] === '+' || str[currentIndex] === '-')) {
        currentIndex++;
    }
    // 记得改回index
    index.currentIndex = currentIndex;
    return scanUnsignedInteger(str, index);
}

/**
 * 判断一个字符串从起始索引开始是否有一个无符号整数
 * @param {*} str 输入字符串
 * @param {*} index 字符串判断的起始索引
 * @return {boolean} 判断结果
 */
function scanUnsignedInteger(str, index) {
    // 先拿到判断的起始索引
    let {currentIndex} = index;
    const before = currentIndex;

    while (currentIndex !== str.length && str[currentIndex] >= '0' && str[currentIndex] <= '9') {
        currentIndex++;
    }
    // 记得把index的更改回写回index
    index.currentIndex = currentIndex;

    return currentIndex > before;
}
