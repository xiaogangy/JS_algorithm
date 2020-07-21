/**
 * @desc 数字以0123456789101112131415……的格式序列化到一个字符序列中。在这个序列中，第5位(从0开始计数)是5，第13位是1，第19位是4，等等。
 * 请写一个函数，求任意第n为对应的数字。
 *
 * 思路：常规的做法是……别TM常规了，我一开始想到的就是统计每个数字的长度。
 * 以一个实际的例子来说，比如我们要找第1001位，因为题目是从第0位开始计数的，所以实际上是找第1002位，所以我们就按照第1002位分析。
 * 我们知道1位数总共是0~9，共10个，远小于1002位，那么10002位肯定在后面。这时候我们知道要找从第一个2位数开始的，第1002-10 = 992位了。
 * 我们再看2位数，2位数的范围是10~99，总共是90个，总长度是180，180 < 992，所以在2位数里还是找不到要找的数字。然后我们再看3位数，3位数的范围
 * 是100~999，总共是900 * 3 = 2700位，这显然已经超过了要找的位置，所以第1002位肯定在3位数里。1002位减去1位数和2位数的长度，就是要从3位数开始
 * 找第812位。812 = 270 * 3 + 2，也就是说第812是从100开始，数过270个3位数后，第271个3位数的第2位。即100 + 270 = 370这个数字的第2位，即7.
 */

function solution(n) {
    if (n < 0) {
        return -1;
    }
    // 换一个计数起点，好理解一点
    let target = n + 1;
    let digit = 1;
    while (true) {
        const count = numsOfDigit(digit);
        // 位数还不够
        if (count * digit < target) {
            target = target - count * digit;
            digit++;
            continue;
        }
        // count的数量已经多余target指定的位数
        return digitAtIndex(target, digit);
    }

}

/**
 * 根据传入的位数，返回几位数总共有多少种
 * @param {*} n 几位数
 * @return {number} 返回指定位数的数字个数
 */
function numsOfDigit(n) {
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 10;
    }
    return 9 * Math.pow(10, n - 1);
}

/**
 * 根据指定的位数digit和要找的位置index，返回找到的数字
 * @param {*} index 要找的位数
 * @param {*} digit 位数
 * @return {number} 找到的数字
 */
function digitAtIndex(index, digit) {
    // 指定位数的数字起点，比如1位数第一个数字就是0，2位数第一个数字就是10
    const beginNumber = digit === 1 ? 0 : Math.pow(10, digit - 1);
    // 余数
    const complement = index % digit;
    const result = Math.floor(index / digit);
    // 指定位置的值
    const ret = String(beginNumber + result)[complement - 1];

    return +ret;
}

function testFunc() {
    const n = 1001;
    console.log(solution(n));
}