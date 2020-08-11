/**
 * @desc 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
 *
 * 考点：优化时间复杂度；堆；partition算法
 * 思路: 这道题最直观的办法就是排序，排序了以后，我们直接输出前K个数就是要找的那K个数，但是排序算法最好的时间复杂度也是
 * o(nlogn)，显然我们还有更加优秀的办法。
 *
 * solution1: partition
 * 牛逼的partition函数又出现了，这个partition函数本质上是在将数组分成左右两边，左边的数字都小于右边的数字，那么如果我们找到
 * 的pivot的index如果刚好是k-1，也就是刚好位于第K个位置，是不是就刚好实现了呢？！
 *
 * solution2：最大堆
 * 如果我们用一个容器来存储k个值，当容器内的元素还不满k个的时候，就让新加入的元素插入；如果容器内已经满了的话，我们需要把新遍历到
 * 的元素和当前容器内元素的最大值比较，如果当前元素比最大值小，那就剔除最大值，把当前元素插入到容器内；如果当前元素比最大值还要大，
 * 显然抛弃就完了。根据这个思路，显然这个容器，大顶堆最合适不过了，堆中插入和删除一个元素时间复杂度都是O(k)，共有n个元素，自然
 * 时间复杂度就是O(nlogK);
 * 试用场景：这个方法适用于海量数据，而且不会改变原来的数组
 */

function solution1(input, k) {
    const length = input.length;
    // 健壮性走一波
    if (length < k || k <= 0) {
        return [];
    }

    // 下面进入正题
    let start = 0;
    let end = length - 1;
    let index = partition(input, start, end);
    while (index !== k - 1) {
        if (index < k - 1) {
            index = partition(input, index + 1, end);
        } else {
            index = partition(input, start, index - 1);
        }
    }

    const result = [];
    for (let i = 0; i < k; i++) {
        result.push(input[i]);
    }
    // SB牛客上还要排序，智障
    return result.sort();
}

/**
 * 经典的partition函数，将数组分成左右两个部分
 * @param {*} array 待分的数组
 * @param {*} start 数组的起始元素
 * @param {*} end 数组的终止元素
 * @return {*} 返回index的位置
 */
function partition(array, start, end) {
    if (!array.length) {
        return null;
    }
    // 取第一个元素作为pivot值
    const pivot = array[start];
    let left = start;
    let right = end;
    while (left !== right) {
        // 顺序很重要，要先从右边开始往左找，原因自己分析一个极端情况就知道了
        while (left < right && array[right] >= pivot) {
            right--;
        }
        while (left < right && array[left] <= pivot) {
            left++;
        }
        if (left < right) {
            const temp = array[right];
            array[right] = array[left];
            array[left] = temp;
        }
    }
    array[start] = array[left];
    array[left] = pivot;

    return left;
}

// ---------------------华丽的分割线------------------------- //
// 先实现一下大顶堆
/**
 * 上浮操作
 * @param  {Arry} list    待调整的二叉堆（数组）
 * @return {[type]}      [description]
 */
function upAdjust(list) {
    let childIndex = list.length - 1;
    // 为什么这里会是(childIndex - 1)/2呢，分析一下规律就知道了
    // 因为二叉堆本身是一个完全二叉树，当前节点如果是父节点的左子节点，那么index肯定是奇数，同理，右节点肯定是偶数
    let parentIndex = Math.floor((childIndex - 1) / 2);
    // 保存待调整节点的值
    let temp = list[childIndex];

    while (childIndex > 0 && temp > list[parentIndex]) {
        // 不用直接交换，只赋值一方即可
        list[childIndex] = list[parentIndex];
        childIndex = parentIndex;
        parentIndex = Math.floor((parentIndex - 1) / 2);
    }
    // 最后把插入节点放入到合适的位置
    list[childIndex] = temp;
}

/**
 * 下沉操作
 * @param  {[type]} list        二叉堆
 * @return {[type]}             [description]
 */
function downAdjust(list) {
    const length = list.length;
    let parentIndex = 0;
    let childIndex = 1;
    // 保存父节点的值，用于最后的赋值
    let temp = list[parentIndex];

    while (childIndex < length) {
        // 左右孩子比较，记录更大的那个孩子节点
        if (childIndex + 1 < length && list[childIndex] < list[childIndex + 1]) {
            childIndex++;
        }
        // 如果两个孩子都比父节点小，则直接退出
        if (list[childIndex] <= temp) {
            break;
        } else {
            list[parentIndex] = list[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
    }
    list[parentIndex] = temp;
}

//solution2: 牛逼的二叉堆来了
function solution2(input, k) {
    const length = input.length;
    // 健壮性走一波
    if (length < k || k <= 0) {
        return [];
    }

    // 回归正题
    // 1. 创建堆，堆是逻辑结构，物理结构是一个数组
    const heap = [];
    // 2. 遍历数组，然后插入到堆中
    for (let i = 0; i < length; i++) {
        const current = input[i];
        // 堆的操作来了
        const heapLength = heap.length;
        if (heapLength < k) {
            // 堆还没有满，就把当前的元素插入就完了
            heap.push(current);
            upAdjust(heap);
            continue;
        } else {
            // 堆已经满了，这个时候要把当前元素和堆顶元素做比较
            const max = heap[0];
            if (current < max) {
                // 直接拿当前元素替换堆顶元素
                heap[0] = current;
                // 然后调整堆的结构
                downAdjust(heap);
            }
        }
    }
    return heap.sort();
}

function testFunc() {
    const numbers = [4, 5, 1, 6, 2, 7, 3, 8];
    console.log(solution2(numbers, 4));
}
testFunc();