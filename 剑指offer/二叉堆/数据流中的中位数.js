/**
 * @desc 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
 * 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。
 *
 * 思路：这道题中数据是从数据流中得到的，那么也就是说随着时间推移，从数据流中得到的数据会越来越多。我们先来考虑一下如果不是从数据流中得来的数据，而是找数组中的中位数。
 * 1). partition方法，时间复杂度为O(n); 2). 将数组排序，然后在O(1)的时间复杂度内可以得到中位数，但是最稳定的排序算法时间复杂度也到O(nlogn)了
 * 现在回归我们这道题，数组固然可以，但是我们有没有更好的办法呢？我们知道中位数把数组分成了两个部分，如果有对于数据流中的数据，能够恰好平分一半在左侧，一半在右侧，那么首先
 * 数量上有助于我们找中位数；光平分还不行，最好还能够以较低的时间复杂度得到左边的最大值和右边的最小值，因为这两个值才符合中位数的要求。这就需要借助堆的特点，并在操作中满足
 * 如下要求：
 * 1). 能用左边最大值和右边最小值来解决问题，必然需要左边堆的大小和右边堆的大小差值不能大于1，也就是说要平均分配。为了实现平均分配，我们可以在当前堆中数据的总数目是偶数时，
 * 把新数据插入到最小堆，否则插入最大堆。
 * 2). 要保证左边最大堆的所有值小于右边的最小堆。这个也好解决，比如当我们要把一个数插入到右边的最小堆之前，先和左边最大堆的堆顶元素，也就是最大值比较一下。如果小于最大值，
 * 就把最大值剔除，把最大值放入到右边的最小堆，而把当前值插入到左边的最大堆。
 *
 * solution:
 * 1. 创建两个堆，一个是大堆，一个小堆。
 * 2. 从数据流中读取一个元素，如果当前堆中元素总和是偶数，就把这个元素插入到右边最小堆，否则插入到左边最大堆。
 * 3. 插入之前要和另外一个堆的堆顶元素比较，具体咋比较，see the code
 */

// 1. 创建大小堆
const MaxHeap = require('./最大优先队列');
const MinHeap = require('./最小优先队列');
const MAX = new MaxHeap();
const MIN = new MinHeap();

/**
 * 从数据流中读取一个数字，然后插入到容器中
 * @param {*} num 待插入的数字
 */
function Insert(num) {
    // 2. 判断当前堆中的元素数量
    const minSize = MIN.array.length;
    const maxSize = MAX.array.length;
    if (((minSize + maxSize) & 1) === 0) {
        // 当前堆中数量和为偶数，把当前数字插入到右侧小顶堆
        const max = MAX.array[0];
        if (maxSize && num < max) {
            MAX.deQueue();
            MAX.enQueue(num);
            MIN.enQueue(max);
        } else {
            MIN.enQueue(num);
        }
    } else {
        // 当前堆中数量和为奇数，把当前数字插入到左边最大堆
        const min = MIN.array[0];
        if (minSize && num > min) {
            MIN.deQueue();
            MIN.enQueue(num);
            MAX.enQueue(min);
        } else {
            MAX.enQueue(num);
        }
    }
}

function GetMedian() {
    const minSize = MIN.array.length;
    const maxSize = MAX.array.length;
    const size = minSize + maxSize;

    if (size === 0) {
        return null;
    }
    if ((size & 1) === 0) {
        return (MAX.array[0] + MIN.array[0]) / 2;
    } else {
        return MIN.array[0];
    }
}


function testFunc() {
    const numbers = [1, 3, 2, 8, 9];
    numbers.forEach(number => {
        Insert(number);
    });
    console.log(GetMedian());
}
testFunc();