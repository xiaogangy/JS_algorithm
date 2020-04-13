/**
 * @description 给出两个很大的整数，要求实现程序求出两个整数的和
 *
 * 思路：JS中的最大安全整数为2^53 - 1，这个数有多大呢？9007199254740991，按十进制来说的话，共有16位，显然这个数还不满足'很大'的定义，因此不能使用
 * 整数来进行加法运算，不然超过安全整数，计算值就是错的。这里考虑用string来做大数的加法运算。
 * 小学中学过两个数的加减，会把两个数竖直排列，右边对齐，然后按位加减，并进行进位运算。这里我们也使用这种思路来解决问题。
 *
 * solution：
 * 1. 创建两个整型数组，数组长度是较大整数的长度加1。把每个整数倒序存储在数组中，整数的个位存于数组下标为0的位置，最高位存于数组的尾部，不满的位置存0。
 *    (这样存的原因是更符合我们从左到右访问数组的习惯)
 * 2. 创建结果数组，结果数组的长度同样是较大整数的位数加1，加一的目的也很明确，就是留给最高位进位用的
 * 3. 遍历两个数组，从左到右按照对应下标把两元素两两相加，再加上结果数组同一位置的元素（保存的是进位元素），进位的元素填充到结果数组的下一个位置
 *
 */

function bigNumberSum(strA, strB) {
    // 1. 先把string转为number数组，方便后续计算
    const maxLength = strA.length >= strB.length ? strA.length + 1 : strB.length + 1;
    const numA = strA.split('').map(i => parseInt(i, 10)).reverse();
    const numB = strB.split('').map(i => parseInt(i, 10)).reverse();
    while (numA.length < maxLength) {
        numA.push(0);
    }
    while (numB.length < maxLength) {
        numB.push(0);
    }

    // 2. 创建结果数组，长度为maxlength
    const result = new Array(maxLength).fill(0);

    // 3. 从左到右遍历数组，依次相加
    for (let i = 0; i < maxLength; i++) {
        let temp = result[i];
        temp = numA[i] + numB[i] + temp;
        // 进位运算
        if (temp >= 10) {
            temp = temp - 10;
            result[i + 1] = 1;
        }
        result[i] = temp;
    }

    // 4. 将结果数组reverse再转成string
    let j = maxLength - 1;
    while (result[j] === 0) {
        result.pop();
        j--;
    }
    const retStr = result.reverse().join('');
    return retStr;

}

function testFunc() {
    const strA = '23148127349821934879983475983475';
    const strB = '9007199254740991';
    console.log('result--->', bigNumberSum(strA, strB));
}

testFunc();