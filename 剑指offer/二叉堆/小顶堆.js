/**
 * @file 二叉堆
 * 定义：二叉堆是一种特殊的完全二叉树，如果任意父节点小于它的左右子节点，则称为最小堆；同理，如果任意父节点都大于它的左右子节点，则为最大堆
 * 实际作用：堆排序
 * 存储方式：数组 ———— 因为是完全二叉树，则直接用数组存储即可。若父节点的index为parent，则左子节点的index为2 * parent + 1，右子节点的索引为2 * index + 2;
 * 二叉堆的操作（以最小堆为例）
 * - 插入：将节点插入到二叉堆的最后一个位置，然后进行“上浮操作”，将新节点浮动到合适的位置
 * - 删除：将头节点删除，然后把最后一个节点临时补充到头结点，然后对头结点进行下沉操作
 * - 构建二叉堆：对于所有的非叶子节点，依次进行下沉操作
 */

/**
 * 上浮操作
 * @param  {Arry} list    待调整的二叉堆（数组）
 */
function upAdjust(list) {
    let childIndex = list.length - 1;
    // 为什么这里会是(childIndex - 1)/2呢，分析一下规律就知道了
    // 因为二叉堆本身是一个完全二叉树，当前节点如果是父节点的左子节点，那么index肯定是奇数，同理，右节点肯定是偶数
    let parentIndex = Math.floor((childIndex - 1) / 2);
    // 保存待调整节点的值
    let temp = list[childIndex];

    while (childIndex > 0 && temp < list[parentIndex]) {
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
 * @param  {[type]} parentIndex 当前要下沉的节点
 * @param  {[type]} length      二叉堆的长度
 */
function downAdjust(list, parentIndex, length) {
    let childIndex = 2 * parentIndex + 1;
    // 保存父节点的值，用于最后的赋值
    let temp = list[parentIndex];

    while (childIndex < length) {
        // 左右孩子比较，记录更小的那个孩子节点
        if (childIndex + 1 < length && list[childIndex] > list[childIndex + 1]) {
            childIndex++;
        }
        // 如果两个孩子都比父节点大，则直接退出
        if (list[childIndex] >= temp) {
            break;
        } else {
            list[parentIndex] = list[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
    }
    list[parentIndex] = temp;
}


/**
 * 构建二叉堆，从最后一个非叶子节点开始，依次做下沉操作
 * @param  {[type]} list 待调整的二叉堆（数组）
 */
function buildBinaryHeap(list) {
    for (let i = Math.floor((list.length - 1 - 1) / 2); i >= 0; i--) {
        downAdjust(list, i, list.length);
    }
}

// 测试函数
function testFunc() {
    let arr = [1, 3, 2, 6, 5, 7, 8, 9, 10, 0];
    upAdjust(arr);
    console.log(arr);

    let arr_2 = [7, 1, 3, 10, 5, 2, 8, 9, 6];
    buildBinaryHeap(arr_2);
    console.log(arr_2);
}

testFunc();
