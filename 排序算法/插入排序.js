/**
 * @file 插入排序
 * 插入排序也是一种较为直观的排序思想，思路为从左往右构建有序序列，然后扫描有序序列后面的值，将扫描的数值与有序序列中的每个数值进行比较，插入到合适的位置
 * 其实有点像打麻将或者打牌时候，把新拿到的牌放到合适的位置。
 * 注意：插入排序是进行持续位移的，不小心就会写成冒泡排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * 稳定排序
 */

function insertSort(arr) {
    const length = arr.length;
    // 外层循环控制当前要找合适位置的元素索引
    // 一个元素时，默认有序
    for (let i = 1; i < length; i++) {
        // 记录当前要进行找位置的元素
        let current = arr[i];
        let preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

function testFunc() {
    const arr = [2, 4, 5, 1, 6, 9, 7, 8, 3];
    console.log(insertSort(arr));
}

testFunc();
