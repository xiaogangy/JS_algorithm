/**
 * @file 希尔排序
 * 希尔排序是第一个突破O(n^2)的排序算法，是对插入排序的一种改善
 * 实现：
 * - 选择一个降序的增量序列t1, t2, ……, tk，tk = 1
 * - 按增量序列的个数k，对序列进行k趟排序
 * - 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。当增量因子为1时，即成为一个简单插入排序
 * 时间复杂度：平均O(n^1.3) 最坏O(n^2)-退化成插入排序 最好O(n)
 * 空间复杂度：O(1)
 * 不稳定排序
 */

function shellSort(arr) {
    // 关于增量序列的选择：采用最简单的选择方式，Math.floor(length/2)
    let length = arr.length;
    for (let gap = Math.floor(length/2); gap > 0; gap = Math.floor(gap/2)) {
        // 从第一个符合增量长度的元素开始进行对比
        for (let i = gap; i < length; i++) {
            // 当前要进行插入排序的元素
            let current = arr[i];
            // j用来记录小于当前元素指定增量的元素索引
            let j = i;
            // 注意：这里只和自己差增量序列大小的元素进行比较；使用的是插入排序
            while(j - gap >= 0 && current < arr[j - gap]) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}

const arr = [3, 4, 1, 9, 8, 5, 6, 2, 7];
console.log(shellSort(arr));
