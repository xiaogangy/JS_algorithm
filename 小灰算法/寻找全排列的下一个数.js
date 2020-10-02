/**
 * @description 给出一个正整数，找出这个正整数所有数字全排列的下一个数。
 * 通俗的讲，就是在一个整数所包含数字的全部组合中，找到一个大于且仅大于原整数的新整数。举几个例子，
 * 如果输入为12345，输出为12354；如果输入为12354，输出为12435；输入为12435，输出为12453
 *
 * 思路：先明确一些基本常识，由固定几个数字组成的整数，这些数字逆序排列的情况下组成的数字最大，顺序排列的情况下组成的数字最小。
 * 同时，这个数为了和原数最接近，那么就应该让变化尽量小，即尽量保持高位不变，低位在最小范围内变换顺序。
 *
 * solution：
 * 1. 从后向前查看逆序区域，找到第一个逆序区域中的第一位，也就是数字置换的边界
 * 2. 让逆序区域的第一位和其后区域中大于它的最小的数字交换位置
 * 3. 把原来的顺序区域转为逆序状态
 */

function findNearsetNumber(number) {
    // 先把整数转为数组，这样方便操作
    const list = String(number).split('').map(int => parseInt(int, 10));
    const length = list.length;

    // 1. 先找逆序区域，找到逆序区域的前一位
    let index = 0;
    for (let i = length - 1; i > 0; i--) {
        if (i - 1 >= 0 && list[i] > list[i - 1]) {
            // 注意这里是把逆序区域的第一位index传回去了
            index = i;
            break;
        }
    }
    // index仍为0，表示当前整数是全逆序，已经没有比它更大的数了，直接结束吧
    if (index === 0) {
        return null;
    }

    // 2. 找到其后区域中刚刚好大于待交换元素的值，交换二者
    const comparedValue = list[index - 1];
    for (let j = length - 1; j > (index - 1); j--) {
        if (list[j] > comparedValue) {
            list[index - 1] = list[j];
            list[j] = comparedValue;
            break;
        }
    }

    // 3. 将之前的逆序区域改为顺序
    let m = index;
    let n = length - 1;
    for (; m < n; m++, n--) {
        // 由于是逆序区域，直接首尾交换就可以了
        let temp = list[n];
        list[n] = list[m];
        list[m] = temp;
    }

    const ret = parseInt(list.join(''), 10);
    return ret;
}

function test() {
    let a = 12345;
    let b = 12354;
    let c = 12435;
    let d = 4965432;
    console.log('12345的下一位', findNearsetNumber(a));
    console.log('12354的下一位', findNearsetNumber(b));
    console.log('12435的下一位', findNearsetNumber(c));
    console.log('4965432的下一位', findNearsetNumber(d));
}

test();