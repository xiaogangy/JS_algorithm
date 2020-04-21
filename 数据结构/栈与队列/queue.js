/**
 * @file 本文采用数组实现循环队列
 * 队列是一种先进先出线性逻辑结构，同样的可以用数组或者链表实现；
 * 队列的先进先出特性，使其可以应用任务调度方面
 */

function createQueue(capacity) {
    // 为了方便区分是满队列还是空队列的情况，将rear设置为队尾元素的后一个节点index
    // 这样判断满队列时，(rear+1)%capacity === front
    // 判断空队列时，front === rear
    // 也因此，队列中会空出一个元素，因此设置数组容量时，要为capacity + 1
    // 为什么不按照正常习惯把front指向头部，rear指向尾部？
    // 因为这样很难区分，队列为空，队列只有1个元素等多种情况

    // 将数组变为私有属性，只返回可以操作的方法
    const arr = new Array(capacity + 1);
    // 队列需要保存队头&&队尾
    let front = 0;
    let rear = 0;

    // 入队
    function offer(item) {
        // 当(rear+1)%capacity === front时，队列已满
        if ((rear + 1) % capacity === front) {
            throw new Error('队列已满');
        }
        arr[rear] = item;
        rear = (rear + 1) % capacity;
    }

    // 出队
    function poll() {
        // 当front和rear相等时
        if (front === rear) {
            throw new Error('队列为空');
        }
        const topItem = arr[front];
        front = (front + 1) % capacity;
        return topItem;
    }

    // 输出队列的值
    function log() {
        const result = [];
        for (let i = front; i !== rear; i = (i + 1) % capacity) {
            result.push(arr[i]);
        }
        console.log(result.join(','));
    }

    // 判断队列是否为空
    function isEmpty() {
        return front === rear;
    }

    return {offer, poll, log, isEmpty};
}

const queue = createQueue(6);
queue.offer(1);
queue.offer(2);
queue.offer(3);
queue.offer(4);
queue.offer(5);
// queue.log();
// queue.offer(6);
queue.poll();
queue.poll();
// queue.log();
queue.offer('lalala');
queue.log();

module.exports = createQueue;
