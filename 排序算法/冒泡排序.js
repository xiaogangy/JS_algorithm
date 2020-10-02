/**
 * @file 冒泡排序
 * 冒泡排序的思想是相邻元素两两比较，当一个元素大于右侧相邻元素时，交换他们的位置；当一个元素小于或者等于右侧相邻元素时，位置不变。
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * 属于稳定排序（即排序前相同元素的顺序在排序后仍然保持相同的顺序）
 */

// 使用双层循环实现，外层循环控制执行的轮数，一轮产生一个最大值，例如如果有8个元素，则需要7轮完成排序
// 内层循环用来进行两两比较
function bubbleSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 改进版冒泡排序
// 改进点1：有时候在进行到中间某一轮的时候，就已经有序了，这时候就没必要进行后面几轮的比较了
function bubbleSortOpt1(arr) {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        // 增加一个用来判断本轮是否有交换元素的变量，如果没交换，则说明当前序列已经有序
        let sorted = true;
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 因为涉及到元素交换，所以本轮肯定不是有序的
                sorted = false;

                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        // 如果本轮没有交换，则说明序列已经有序，没必要进行后续的比较了
        if (sorted) {
            break;
        }
    }
    return arr;
}

// 改进点2：有时候arr的后半部分已经完全有序，而且后半部分的最小元素都大于前半部分的最大值，例如：
// [3, 4, 2, 1, 5, 6, 7, 8]，这时候其实是没必要进行后面几个元素的比较的，解决思路就是记录当前这一轮
// 最后一次进行交换的元素位置，该位置即为无序序列的边界，后面的序列为有序区域，无需再判断了
function bubbleSortOpt2(arr) {
    const length = arr.length;
    // 记录最后一次交换的元素位置
    let lastExchangeIndex = 0;
    // 无序数列的边界，每次比较只需要比较到这里即可
    let unsortedBorder = length - 1;
    for (let i = 0; i < length - 1; i++) {
        // 增加一个用来判断本轮是否有交换元素的变量，如果没交换，则说明当前序列已经有序
        let sorted = true;
        for (let j = 0; j < unsortedBorder; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;

                // 因为涉及到元素交换，所以本轮肯定不是有序的
                sorted = false;
                // 更新为最后一次交换元素的位置
                lastExchangeIndex = j;
            }
        }
        // 记录本轮结束后，无序区域的边界
        unsortedBorder = lastExchangeIndex;
        // 如果本轮没有交换，则说明序列已经有序，没必要进行后续的比较了
        if (sorted) {
            break;
        }
    }
    return arr;
}

function testFunc() {
    const arr = [5, 8, 6, 3, 9, 2, 1, 7];
    console.log(bubbleSort(arr));

    const arr1 = [5, 8, 6, 3, 9, 2, 1, 7];
    console.log(bubbleSortOpt1(arr1));

    const arr2 = [3, 4, 2, 1, 5, 6, 7, 8];
    console.log(bubbleSortOpt2(arr2));
}
