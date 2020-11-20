/**
 * @desc 将一个字符串转换成一个整数，要求不能使用字符串转换整数的库函数。数值为0或者字符串不是一个合法的数值则返回0
 *
 * solution: 非常类似于表示数值的字符串这道题，但是这里更加简单，只是整数，所以一个字符串可以表示为整数，这个模式用正则表示是'[+-]?[0-9]+e?[0-9]+'
 * 我们可以先用这个正则来判断一下字符串是不是整数，然后再对是否出现了'e'或者'+-'等字符来进行转换
 */

function solution(str) {
    const regular = /^[+-]?[0-9]+[eE]?[0-9]+$/;
    if (!regular.test(str)) {
        return 0;
    }

    // 步入正题
    let start = 0;
    if (str[0] === '+' || str[0] === '-') {
        start++;
    }
    const ePos = str.indexOf('e') > -1 ? str.indexOf('e') : str.indexOf('E');
    // 字符串中不包含e
    if (ePos === -1) {
        const newStr = str.slice(start);
        let result = str2Int(newStr);
        result = str[0] === '-' ? -result : result;
        return result;
    }
    // 字符串中包含e，那么要分为两步，先求e前的，再求e后的
    const first = str.slice(start, ePos);
    let result = str2Int(first);
    const second = str.slice(ePos + 1);
    result = result * Math.pow(10, second); // Math.pow这个方法会直接把第二个参数变为number类型
    // 记得以'-'开头的字符串，要是负数
    result = str[0] === '-' ? -result : result;

    return result;
}

function str2Int(str) {
    const length = str.length;
    let val = 0;
    for (let i = 0; i < length; i++) {
        const current = str[i] - '0';
        val = 10 * val + current;
    }
    return val;
}

function testFunc() {
    const str = '123e1';
    console.log(solution(str));
}
testFunc();