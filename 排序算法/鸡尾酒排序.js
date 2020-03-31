/**
 * @file 鸡尾酒排序
 * 鸡尾酒排序是的原理和冒泡排序类似，冒泡排序的方向是单向的，例如总是从左到右选出最大值
 * 而鸡尾酒排序的思路是进行双向排序，例如先从左到右选出最大值，下一轮就从右到左选出最小值
 * 这样的优势是什么呢？
 * 考虑这样一个序列[2, 3, 4, 5, 6, 7, 8, 1]，其实只有最后一个元素是无序的，但是按照之前的冒泡排序，仍然需要进行7轮排序
 * 鸡尾酒排序就可以解决这个问题，第一轮左 --> 右后，8变为最右，然后进行从右 --> 左，选最小，1回到顶部，至此数组变为有序
 */

function cocktailSort(arr) {
    const length = arr.length;
    for (let i = 0; i < Math.floor(length/2); i++) {

        let isSorted = true;
        // 先进行从左到右，筛选最大元素
        for (let j = i; j < length - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                // 有元素交换，所以不是有序的，设置为false
                isSorted = false
            }
        }
        if (isSorted) {
            break;
        }

        // 从右往左，筛选最小元素，此时需要重置isSorted的值
        isSorted = true;
        for (let j = length - i - 1; j > i; j--) {
            if(arr[j] < arr[j-1]) {
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                // 有元素交换，所以不是有序的，设置为false
                isSorted = false
            }
        }
        if (isSorted) {
            break;
        }
    }
    return arr;
}

function testFunc() {
    const arr = [2, 3, 4, 5, 6, 7, 8, 1];
    console.log(cocktailSort(arr));
}

testFunc();
