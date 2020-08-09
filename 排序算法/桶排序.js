/**
 * @file 桶排序
 * 描述：桶排序同样也是一种非比较的，时间复杂度呈线性的排序算法，可以解决计数排序的一些痛点
 * 计数排序要求数组的值都为整数，同时也不适用于最大值和最小值差距过大的序列，因为要声明统计数组，这个数组会非常稀疏
 * 桶排序就解决了这个问题-每个桶表示一个范围区间
 * 实现：
 * - 确定桶的个数，一般是数组有多长，就声明多少个桶
 * - 确定桶的空间范围，一般最后一个桶只容纳最大元素，所以桶的区间范围为(最大值 - 最小值) / (桶的数量 - 1)，桶的范围区间是[a, b)，即前闭后开
 * - 遍历原始数组，把元素按照大小填入到指定的桶中
 * - 对每个桶内的元素进行排序
 * - 遍历所有的桶，输出元素
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 稳定排序
 */

// 冒泡排序，后面用到
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


function bucketSort(arr) {
    const length = arr.length;
    let result = [];
    // 1. 初始化桶
    const bucketList = new Array(length).fill(0).map(() => ([]));
    // 2. 确定桶的范围区间
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    let d = (max - min) / (length - 1);
    // 3. 遍历原始数组，将值依次填入桶中
    for (let i = 0; i < length; i++) {
        let diff = arr[i] - min;
        let index = Math.floor(diff / d);
        bucketList[index].push(arr[i]);
    }
    // 4. 对每个桶内进行排序
    for (let i = 0; i < length; i++) {
        // 这里随便选择一种排序方法
        bubbleSort(bucketList[i]);
        // 5. 输出每个桶中的元素
        for (let j = 0; j < bucketList[i].length; j++) {
            result.push(bucketList[i][j]);
        }
    }

    return result;
}

function testFunc() {
    const arr = [4.12, 6.421, 0.0023, 3, 2.213, 8.122, 4.12, 10.09];
    console.log(bucketSort(arr));
}

testFunc();