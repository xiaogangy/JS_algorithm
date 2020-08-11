/**
 * @desc 请实现一个函数，把字符串中的每个空格替换成'%20'。例如，输入'we are happy', 则输出'we%20are%20happy'.
 *
 * solution: 这道题其实披露了一个JS的考点，即JS中的字符串是不可变的。这是什么意思呢？在C或者C++中，我们是可以通过指针来操作字符串的，因为指针指向的
 * 就是字符串在内容中真实存储的地址，但是在JS中是不会对字符串修改的，也就是说无论你对一个基础数据类型的string操作，还是强制给它转换成一个String对象的
 * 操作，最终都不会对原来的字符串进行修改，都是会生成一个新的字符串。所以这道题本意是考察C++中指针的对字符串的操作，但是对于JS，没有意义。
 *
 * 但是，but!这道题提出了一种解题的新思路，比如在合并两个数组时，如果从前往后复制每个数字需要重复移动很多次，那么我们可以考虑从后往前复制，这样就能减少
 * 复制的次数，从而提高效率
 */

function replaceSpace(str) {
    if (!str) {
        return null;
    }
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === ' ') {
            arr.push('%20');
        } else {
            arr.push(str.charAt(i));
        }
    }
    return arr.join('');
}

// 方法2： String.prototype.replace方法