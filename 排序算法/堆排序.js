/**
 * @file 堆排序
 * 思想：堆排序借助了堆的特点，以大顶堆为例，堆顶的元素为最大值，每次删除堆顶的元素，然后堆会重新调整，第二大的元素会成为新的堆顶，如此往复，就会变成有序序列。
 * 实现：
 * - 将数组构造成一个二叉堆，如果要顺序排列，就构造大顶堆；逆序排列，就构造小顶堆
 * - 每次删除堆顶元素，替换到二叉堆的末尾，调整堆结构产生新的堆顶
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 */

function heapSort(arr) {
    const length = arr.length;
    // 1.构建二叉堆(从最后一个非叶子节点开始，依次进行下沉操作)
    for (let i = Math.floor((length - 2)/2); i >= 0; i--) {
        downAdjust(arr, i, length);
    }
    // 依次删除堆顶元素，放到队尾
    // i用来记录无序堆的长度
    for (let i = length - 1; i > 0; i--) {
        // 第一个元素和最后一个元素交换
        let temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        downAdjust(arr, 0, i);
    }
    return arr;
}

/**
 * 下沉操作
 * @param  {[type]} arr         待调整的堆
 * @param  {[type]} parentIndex 待调整的元素位置
 * @param  {[type]} length      堆的大小
 * @return {[type]}             [description]
 */
function downAdjust(arr, parentIndex, length) {
    // 保存父节点的值，用于后续比较
    let temp = arr[parentIndex];
    let childIndex = 2 * parentIndex + 1;
    while(childIndex < length) {
        // 如果有右孩子，且右孩子的值大于左孩子的值，则定位到右孩子
        if (childIndex + 1 < length && arr[childIndex + 1] > arr[childIndex]) {
            childIndex++;
        }
        // 父节点为最大值时，直接退出循环，表明已经找到了合适的位置
        if (arr[childIndex] <= temp) {
            break;
        }
        arr[parentIndex] = arr[childIndex];
        parentIndex = childIndex;
        childIndex = 2 * childIndex + 1;
    }
    // 将父节点的值放到合适的位置
    arr[parentIndex] = temp;
}

function testFunc() {
    const arr = [1, 3, 2, 6, 5, 7, 8, 9, 10, 0];
    console.log(heapSort(arr));
}

testFunc();
