/**
 * @file 基数排序
 * 描述：基数排序也是一种线性时间复杂度的排序算法，是对计数排序的一种改进，思想是先按照低位进行排序，然后收集；再按照次低位进行排序，再进行收集，依次类推，直到最高位完成排序。
 * 实现:
 * - 取得数组中的最大数，并得到最大位数
 * - arr为原始数组，从最低位开始取每个位进行排序，使用计数排序后将值回填回原数组，下一轮继续用
 * 时间复杂度：O(n*k), 其中k为最多的位数
 * 空间复杂度：O(n)
 */

function radixSort(arr) {
    const length = arr.length;
    // 1. 取得最大值，确定最大位数
    let max = arr[0];
    for (let i = 0; i < length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    // 表示序列里的最大数，最多有这么多位
    const maxDigit = String(max).length;
    // 使用计数排序进行统计
    const countArr = new Array(10).fill(0).map(() => ([]));
    // 进行取余和截断操作
    let mod = 10;
    let dev = 1;
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        // 2. 取出数组中每个值的这一位，进行计数排序
        for (let j = 0; j < length; j++) {
            // 对应位上的值
            let value = Math.floor((arr[j] % mod) / dev);
            countArr[value].push(arr[j]);
        }
        // 3. 弹出统计数组中的元素，注意按照队列的顺序弹出，这样才能保证排序是稳定的
        let pos = 0; // 要覆盖原数组了
        for (let m = 0; m < countArr.length; m++) {
            let currentArr = countArr[m];
            while (currentArr.length) {
                arr[pos] = countArr[m].shift();
                pos++;
            }
        }
    }
    return arr;
}

function testFunc() {
    const arr = [1234567, 18880572, 1345, 9882563, 6, 85];
    console.log(radixSort(arr));
}

testFunc();
