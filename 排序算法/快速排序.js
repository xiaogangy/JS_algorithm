/**
 * @file 快排
 * 快排终于登场了，传说中面试只要问排序必然提到的算法
 * 思路：快排的思路也比较简单，就是选择一个基准元素，对数组进行一轮扫描后，将小于这个基准元素的所有元素放到基准元素的左边，大于它的所有元素放到右边。然后对于左右两个子序列，再进行同样的处理，直到子序列的长度为1。
 * 实现：快排必须掌握递归和非递归两个版本的实现，按照思路的不同还可以分为双边循环法和单边循环法
 * 基准元素的选择：一般推荐随机选择数组中的一个元素作为基准元素，这样可以减少极端情况的发生。本文为了方便，选择了数组第一个元素作为基准
 * 平均时间复杂度：O(nlogn)
 * 最坏时间复杂度：O(n^2)  在数组完全逆序或者完全有序下触发
 * 空间复杂度：O(logn) 主要是递归造成的栈空间
 */

// 双边循环法
// 设立左右两个'指针'，左指针从左往右扫描，遇到小于或者等于基准元素的就继续向右移动一位，遇到比基准元素大的，就暂停；右指针从右往左扫描数组，遇到比基准元素大的就左移一位，遇到相等的或者小于基准元素的元素，就暂停；
// 此时交换左指针和右指针指向的两个元素，然后继续进行前面的步骤；一直进行到左右指针相遇，则说明扫描完一遍，此时将基准元素与这时候的指针指向的元素进行交换，完成第一轮扫描。然后对基准元素左右两边两个子序列仔进行同样的操作。
// 第一版:
function quickSort_draft(arr, startIndex, endIndex) {
    let left = startIndex;
    let right = endIndex;
    let pivot = arr[startIndex];
    // 递归的第一步：判断递归的终止条件
    if (left >= right) {
        return;
    }
    // 进行双边循环（终止条件是left === right）
    while (left < right) {
        while (left < right && arr[left] <= pivot) {
            left++;
        }
        while (left < right && arr[right] > pivot) {
            right--;
        }
        if (left < right) {
            let temp = arr[right];
            arr[right] = arr[left];
            arr[left] = temp;
        }
    }
    arr[startIndex] = arr[left - 1];
    arr[left - 1] = pivot;
    // 左子序列
    quickSort(arr, startIndex, left - 2);
    // 右子序列
    quickSort(arr, left, endIndex);
}

/**
 * 上面写的太乱，可以把每一轮的选择筛选独立出来写成一个函数partition，成为如下版本
 * 双边循环法（递归版本）
 * @param  {[type]} arr        待排序数组
 * @param  {[type]} startIndex 待排序数组起点
 * @param  {[type]} endIndex   待排序数组终点
 * @return {[type]}            返回基准元素最后的位置
 */
function quickSort(arr, startIndex, endIndex) {
    // 老规矩：写递归先写终止条件
    if (startIndex >= endIndex) {
        return;
    }
    // 得到基准元素
    let pivotIndex = partition(arr, startIndex, endIndex);
    // 根据基准元素，分为两部分进行递归排序
    quickSort(arr, startIndex, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, endIndex);
}
// 分治，将数组分成左右两部分
function partition(arr, startIndex, endIndex) {
    // 设立左右两个指针进行遍历数组
    let left = startIndex;
    let right = endIndex;
    let pivot = arr[startIndex];
    // 进行双边循环，当左右指针相遇时停止循环
    while (left !== right) {
        // 在写这个partition的时候，应该先写右指针，一直都觉得这里判断停止的条件特别考验细节
        // 无论最后是左指针碰到右指针终止，还是右指针碰到左指针终止，左指针指向的位置一定都是小于等于pivot值的
        while (left < right && arr[right] > pivot) {
            right--;
        }
        while (left < right && arr[left] <= pivot) {
            left++;
        }
        if (left < right) {
            let temp = arr[right];
            arr[right] = arr[left];
            arr[left] = temp;
        }
    }
    arr[startIndex] = arr[left];
    arr[left] = pivot;
    // 返回pivotIndex，方便迭代
    return left;
}

/**
 * 单向循环法：
 * 思路：双边循环法是用了左右两个指针来进行数组拆分。单边循环法只设立一个左指针mark，用来追踪比基准元素小的值的区域边界。
 * 具体实现：
 * - 如果遍历到的元素大于等于基准元素，就继续向后遍历
 * - 如果遍历到的元素小于基准元素，要做两件事：
    1. 将mark右移一位
    2. 将mark和当前遍历的元素交换
 * - 继续遍历
 * @param  {[type]} arr        待排序数组
 * @param  {[type]} startIndex 待排序数组的起点
 * @param  {[type]} endIndex   待排序数组的终点
 * @return {[type]}            [description]
 */
function quickSort_2(arr, startIndex, endIndex) {
    // 老规矩：写递归先写终止条件
    if (startIndex >= endIndex) {
        return;
    }
    // 得到基准元素
    let pivotIndex = partition_2(arr, startIndex, endIndex);
    // 根据基准元素，分为两部分进行递归排序
    quickSort_2(arr, startIndex, pivotIndex - 1);
    quickSort_2(arr, pivotIndex + 1, endIndex);
}
// 分治，将数组分成左右两部分
function partition_2(arr, startIndex, endIndex) {
    // 基准值
    let pivot = arr[startIndex];
    // 定义mark变量，用来追踪小于等于基准值的最后一个元素
    let mark = startIndex;
    for (let i = startIndex + 1; i <= endIndex; i++) {
        // 当遍历的元素小于基准元素时，要交换
        if (arr[i] < pivot) {
            mark++;
            // 避免无意义的的交换
            if (mark === i) {
                continue;
            }
            let temp = arr[i];
            arr[i] = arr[mark];
            arr[mark] = temp;
        }
    }
    // 遍历完，基准值要放到合适的位置
    arr[startIndex] = arr[mark];
    arr[mark] = pivot;
    // 将基准元素位置返回，方便后续递归拆分
    return mark;
}

// 非递归版本的实现
// 思路：递归的特点是回溯，所以一般情况下，递归的算法也可以通过栈结构进行实现
// 2020.7.7：下面这个写法，跟栈没多大关系，因为快排本身不涉及左右子序列谁先排谁后排的顺序，这里用队列也可以
// 实现：partition的代码不用动，只用改sort中的递归结构
const createStack = require('../数据结构/栈与队列/stack');
function quickSort_stack(arr, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return;
    }
    // 栈里面保存上文每次进行递归时候，数组的起点和终点索引
    let stack = createStack(10);
    const obj = {
        start: startIndex,
        end: endIndex
    };
    stack.push(obj);
    // 这他娘的看着就是二叉树的层序遍历啊，要啥stack，队列就稳稳的
    while (!stack.isEmpty()) {
        const top = stack.pop();
        let pivot = partition_2(arr, top.start, top.end);
        // 左子序列
        if (top.start < pivot) {
            stack.push({
                start: top.start,
                end: pivot - 1
            });
        }
        // 右子序列
        if (top.end > pivot) {
            stack.push({
                start: pivot + 1,
                end: top.end
            });
        }
    }
}

function testFunc() {
    const arr = [4, 4, 6, 5, 3, 2, 8, 1];
    quickSort(arr, 0, arr.length - 1);
    console.log('排序后', arr);
}

testFunc();
