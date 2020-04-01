/**
 * @file 计数排序
 * 描述：计数排序是一种时间复杂度为线性的算法，适用对象为数组中值全为整数的排序，通过利用数组的下标来实现
 * 时间复杂度：O(n)
 * 空间复杂度：O(m)-m为数组最大值和最小值的差
 */

function countSort(arr) {
    let length = arr.length;
    // 先计算出数组的最大值和最小值
    let max = arr[0];
    let min = arr[0];
    for (let index = 1; index < length; index++) {
        if(arr[index] > max) {
            max = arr[index];
        }
        if (arr[index] < min) {
            min = arr[index];
        }
    }
    let d = max - min;
    // 统计数组：用来统计某个数值出现了多少次
    let countArr = new Array(d + 1).fill(0);
    for (let i = 0; i < length; i++) {
        let d = arr[i] - min;
        countArr[d]++;
    }
    // 把统计数组中的值填充到结果数组中
    let result = [];
    for (let i = 0; i < countArr.length; i++) {
        const realValue = min + i;
        let count = countArr[i];
        while (count > 0) {
            result.push(realValue);
            count--;
        }
    }
    return result;
}

function testFunc() {
    const arr = [4, 4, 6, 5, 3, 2, 8, 1];
    const result = countSort(arr);
    console.log(result);
}

testFunc();