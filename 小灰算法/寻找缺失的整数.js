/**
 * @description 在一个无序数组里面有99个不重复的正整数，范围是1~100，唯独缺少一个1~100中的整数，如何找出这个缺失的整数？
 */

// 解法1：声明一个key从1~100的哈希表，遍历一个数，就把这个数的key删掉，剩下的就是缺失的整数
// 时间复杂度和空间复杂度都为O(n)

// 解法二：因为数的范围刚好是1~100，且出现的99个数都不重复，那么可以借助求和的思想，先算出1加到100的和，减去数组的和，就是确实的数
function lostNumber(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    let total = (1 + 100) * 50;
    return total - sum;
}


/**
 * @description 一个无序数组里面有若干个整数，范围是1~100，其中99个整数都出现了偶数次，只有一个整数出现了奇数次，
 * 如何找到这个出现奇数次的整数？
 * 
 * solution: 这里要用到异或运算XOR，异或运算在进行位运算时，相同元素为0，不同元素为1。任何数和0做异或运算，都等于本身。
 * 可以利用这个特性，偶数次的整数，做异或运算会等于0，而奇数次的运算，最后相当于和0做异或，得到的值即为要找的数。
 * 
 * 时间复杂度为O(n)，空间复杂度为0(1)
 */
function findOddNumber(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result = result ^ arr[i];
    }
    return result;
}


/**
 * @description 如果数组有两个整数出现了奇数次，其他整数出现了偶数次，那么如何找到这2个整数呢？
 * 
 * solution：这里要用到分治法的思想，目的是把这两个奇数次的整数分别落入到两个子数组中，这样每边就可以用上面的方法求解
 * 那么如何让他们落在两边呢？还是上面的办法，对数组中所有的元素进行异或运算，那么最后得到的值，肯定是两个出现奇数次整数的
 * 异或结果。这个结果中肯定有1位是1的，不然就和题目不符，我们可以选择任意一个为1的位数，根据这个位数是否为1把数组分为两个子数组，
 * 然后再根据上面的逻辑找出每个子数组中的目标整数
 */
function findOddNumber_2 (arr) {
    // 1. 先遍历异或数组
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result = result ^ arr[i];
    }
    // 2. 找出为1的位
    let separator = 1;
    for (let j = 0; j < arr.length; j++) {
        if ((result & separator) !== 0) {
            break;
        } else {
            // 左移一位
            separator = separator << 1;
        }
    }
    // 3. 根据这个separator来分割数组，并找到奇数次的整数
    let ret = [0, 0];
    for (let k = 0; k < arr.length; k++) {
        if (arr[k] & separator) {
            // 分到左边
            ret[0] = ret[0] ^ arr[k];
        } else {
            // 分到右边
            ret[1] = ret[1] ^ arr[k];
        }
    }
    return ret;
}

function testFunc() {
    const arr = [4, 1, 2, 2, 5, 1, 4, 3];
    console.log('result', findOddNumber_2(arr));
}
testFunc();