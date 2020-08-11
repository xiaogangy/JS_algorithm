/**
 * @desc 字符串的左旋转操作是把字符串前面的的若干个字符转移到到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。例如，输入字符串"abcdefg"和数字2，该函数将返回
 * 左旋转两位得到的结果"cdefgab".
 *
 * solution: 这道题本意是考察C++字符串的旋转，这里就还是用数组来做吧，思路与翻转字符串那道题一致：
 * - 先对整体翻转
 * - 将字符串根据输入的长度，从后向前分为两部分，依次进行翻转
 */

function reverse(arr, start, end) {
    while (start < end) {
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function leftReverse(str, n) {
    if (!str || !str.length) {
        return '';
    }
    // 注意这里，左旋转的长度可能是大于n的，所以一定要取模
    const count = n % str.length;
    const arr = str.split('');
    const length = arr.length;
    // 1. 先整体翻转
    reverse(arr, 0, length - 1);
    // 2. 再局部翻转
    reverse(arr, 0, length - count - 1);
    reverse(arr, length - count, length - 1);

    return arr.join('');
}

function testFunc() {
    const str = 'abcdefg';
    const n = 8;
    console.log(leftReverse(str, n));
}
testFunc();