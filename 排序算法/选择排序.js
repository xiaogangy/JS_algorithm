/**
 * @file 选择排序
 * 选择排序为最直观的一种排序，思路是每次从未排序序列中选择最大（小）的元素，放到末尾（头部）；再从剩余未排序序列中选择最大元素，放到未排序序列的末尾，依次类推，知道数组完全有序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */

// 选最大
function selectSort(arr) {
    const length = arr.length;
    // 外层循环控制轮数，每一轮选出一个最大值
    for (let i = 0; i < length - 1; i++) {
        let max = arr[0];
        let maxIndex = 0;
        // 内层循环控制比较的次数
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > max) {
                max = arr[j];
                maxIndex = j;
            }
        }
        const lastIndex = length - i - 1;
        let temp = arr[lastIndex];
        arr[lastIndex] = max;
        arr[maxIndex] = temp;
    }
    return arr;
}

// 选最小
function selectSortMin(arr) {
    const length = arr.length;
    // 外层循环控制轮数，每一轮选出一个最大值
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        // 内层循环控制比较的次数
        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

function testFunc() {
    const arr = [2, 4, 5, 1, 6, 9, 7, 8];
    console.log(selectSortMin(arr));
}
