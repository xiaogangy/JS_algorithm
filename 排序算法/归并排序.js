/**
 * @file 归并排序
 * 描述：归并排序也是一种分治思想的实现。基于合并两个有序子序列的思想，可以将一个数组不断划分成最小长度为1的子序列，长度为1的子序列显然为有序，然后再依次合并这些有序子序列，最后实现数组排序
 * 实现：
 * - 把长度为n的序列分为n/2的两个子序列
 * - 对这两个子序列分别采用归并排序
 * - 递归进行上述操作
 * - 将排序好的子序列合并成一个有序序列
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * 稳定排序
 */

function mergeSort(arr) {
    const length = arr.length;
    // 老规矩：递归先写终止条件
    // 如果数组只有一个元素或者空，自然不用排序
    if (length < 2) {
        return arr;
    }
    const pivotIndex = Math.floor(length / 2);
    // 左右两个子序列
    const left = arr.slice(0, pivotIndex);
    const right = arr.slice(pivotIndex, length);
    return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并两个有序序列
 * @param  {[type]} leftArr  左有序序列
 * @param  {[type]} rightArr 右有序序列
 * @return {[type]}          合并之后的序列
 */
function merge(leftArr, rightArr) {
    // 需要借助一个新的数组，来进行插入
    const result = [];
    // 不断比较数组的头元素，将小的插入到结果中
    while (leftArr.length > 0 && rightArr.length > 0) {
        // 此处的等号保证了该排序是稳定排序
        if (leftArr[0] <= rightArr[0]) {
            result.push(leftArr.shift());
        } else {
            result.push(rightArr.shift());
        }
    }
    // 需要判断左右哪个数组还有剩余元素，将其完整插入到result的尾部
    while (leftArr.length > 0) {
        result.push(leftArr.shift());
    }
    while (rightArr.length > 0) {
        result.push(rightArr.shift());
    }
    return result;
}

function testFunc() {
    const arr = [4, 4, 6, 5, 3, 2, 8, 1];
    console.log('排序后', mergeSort(arr));
}

testFunc();
