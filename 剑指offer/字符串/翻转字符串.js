/**
 * @desc 输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串“I am a student.”，则输出“student. a am I”。
 *
 * solution：这道题本质上是想考C++中对字符串的操作，可惜不幸的的是JS重点字符串是不能修改的，所以我们直接考虑成对数组的操作。这道题解法分为两步：
 * - 对数组内所有字符进行颠倒，结果为“.tneduts a ma I”
 * - 对每一个单词再进行二次颠倒，结果为“student. a am I”
 */

function reverseSentence(str) {
    if (!str.length) {
        return str;
    }

    const arr = str.split('');
    // 1. 先反转整体
    reverse(arr, 0, arr.length - 1);

    // 2. 再反转单词
    let start = 0;
    let end = 0;
    while (start < arr.length) {
        if (arr[start] === ' ') {
            start++;
            end++;
        } else if (arr[end] === ' ' || end === arr.length) {
            reverse(arr, start, end - 1);
            start = end;
        } else {
            end++;
        }
    }

    // 3. 返回字符串
    return arr.join('');
}

/**
 * 反转数组元素
 * @param {*} arr 待反转数组
 * @param {*} start 反转的起点
 * @param {*} end 反转的终点
 */
function reverse(arr, start, end) {
    while (start < end) {
        const temp = arr[end];
        arr[end] = arr[start];
        arr[start] = temp;
        start++;
        end--;
    }
}

function testFunc() {
    const str = 'I am a student.';
    console.log(reverseSentence(str));
}
testFunc();