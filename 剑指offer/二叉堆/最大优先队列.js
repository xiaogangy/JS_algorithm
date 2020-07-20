/**
 * @file 优先队列（最大优先队列）
 * 定义：不同于普通队列的先进先出，优先队列指的是出队有特殊规则的队列，具体如下
 * - 最大优先队列：无论入队如何，出队都是出最大的元素
 * - 最小优先队列：无论入队如何，出队都是出最小的元素
 * 实现：用线性数据结构当然也可以实现，例如每次筛选出最大的元素，然后出队即可，但是显然使用二叉堆的效率更高
 */

// 把长度限制给去掉了
class MaxPriorityQueue {
    constructor() {
        // 数组保存二叉堆
        this.array = [];
    }

    // 入队操作
    enQueue(data) {
        this.array.push(data);
        this.upAdjust();
    }

    // 出队操作-把尾部元素放到头部位置，然后做下沉操作
    deQueue() {
        const length = this.array.length;
        if (length === 0) {
            throw new Error('堆为空');
        }
        const head = this.array[0];
        this.array[0] = this.array[length - 1];
        this.array.pop();

        this.array.length && this.downAdjust();
        return head;
    }

    // 二叉堆调整-上浮操作
    upAdjust() {
        const list = this.array;
        let childIndex = list.length - 1;
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

    // 二叉堆调整-下沉操作
    downAdjust() {
        const list = this.array;
        const length = list.length;
        let parentIndex = 0;
        let childIndex = 1;
        // 保存父节点的值，用于最后的赋值
        let temp = list[0];

        while (childIndex < length) {
            // 左右孩子比较，记录更小的那个孩子节点
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
}

function testFunc() {
    const pQueue = new MaxPriorityQueue(5);
    pQueue.enQueue(3);
    pQueue.enQueue(5);
    pQueue.enQueue(10);
    pQueue.enQueue(2);
    pQueue.enQueue(19);
    console.log('出队元素', pQueue.deQueue());
    console.log('出队元素', pQueue.deQueue());
}

// testFunc();

module.exports = MaxPriorityQueue;