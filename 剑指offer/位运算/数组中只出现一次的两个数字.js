/**
 * @desc 一个整型数组除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度为O(1)。
 *
 * solution: 这道题在小灰算法中出现过，所以就不详细说了，只是大概提一下思路。我们知道如果数组中如果只有一个数字出现了一次，而其他数字都出现了两次，我们可以对数组中元素依次做异或运算，
 * 因为相同数字进行异或运算，结果为0，而且0与任何数做异或运算，结果仍然是那个数字；所以异或运算最后的结果就是只出现了一次的那个数字。
 * 那么现在问题是有两个数字都缺失了，我们仍然可以沿用做异或运算的这个思路，对数组中的所有数字都做异或运算。异或运算的结果是两个出现了一次的数字的异或结果，因为这两个数字不相同，所以显然
 * 异或结果是有一个位置为1的，我们不妨找到这个位置，假设是二进制的第3位（从右往左）。然后我们可以根据2进制第三位数字是不是1将数组中所有的数字都分为两拨，这样的话每一侧都只有一个出现了
 * 一次的数字，而重复出现的数字仍然在一侧中，这时候我们就又可以用上面的的方法来求解了。
 *
 */

function findNumsAppearOnce(array) {
    // 健壮性
    if (array.length < 2) {
        return null;
    }

    // 步入正题
    // 1. 先遍历一遍，进行异或运算
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result = array[i] ^ result;
    }
    // 2. 寻找一位为1的bit位
    let division = 1;
    while (!(division & result)) {
        division = division << 1;
    }
    // 3. 第二次遍历，用于分组
    let first = 0;
    let second = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] & division) {
            second = second ^ array[i];
        } else {
            first = first ^ array[i];
        }
    }

    return [first, second];
}

function testFunc() {
    const numbers = [2, 4, 3, 6, 3, 2, 5, 5];
    console.log(findNumsAppearOnce(numbers));
}
testFunc();