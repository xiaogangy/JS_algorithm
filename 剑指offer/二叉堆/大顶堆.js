/**
 * 上浮操作
 * @param  {Arry} list  待调整的二叉堆（数组）
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
 * @param  {Array} list   二叉堆
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
