/**
 * @desc 请定义一个队列并实现函数max得到队列里的最大值，要求函数max，push和pop的时间复杂度都是O(1)。
 *
 * solution: 这道题作为滑动窗口最大值那道题的引申（其实谁是谁的引申都不是重点），应该结合min栈这道题一起思考。我们的思路还是借助两个队列来实现。其中一个作为数据队列记为data，
 * 另外一个作为辅助队列记为max，关键的操作有：
 * - 当第一个值进入总队列的时候，把这个值压入到data中，同时压入到max中
 * - 后续的值再继续进入队列的时候，先压入data中，然后再拿这个值和max队尾的元素依次比较，如果新的值大，就把前面的值依次弹出然后再插入，因为前面的值不可能是最大值；
 * 如果新的值小，则直接插入，因为它有可能在max前面的最大值陆续弹出后成为最大值。
 * - 不同于滑动窗口那道题的是，我们的data队列没有大小限制，所以可以放心大胆的插入队列，不用考虑因为新值的插入而移除旧值
 * - 如果要从队列中弹出一个值呢？data队列无所谓，直接弹就是了，但是要做到如果data中弹出的值刚好是max中的最大值，max的头元素也弹出。在min栈中的做法，我们是用data的头结点值
 * 和max的头结点值进行比较，如果相同，则都弹出。这里可以继续使用这个方法，当然我们也可以在往队列中添加值时，把这个值稍稍的改一下，给这个值添加一个index，然后在max中存入这个
 * index。二者都可以，无可厚非。
 *
 * 下面的做法是使用的index方法
 */

// 每插入一个新的值，就自加1，用来标识唯一的元素
let index = 0;
// 数据队列
const data = [];
// max队列
const max = [];

// 入队
function push(number) {
    // 先构造要真实入队的数据结构
    const struct = {value: number, index};
    index++;
    // 无脑入data
    data.push(struct);
    // 动动脑入max（小于等于前面值的都会入队列）
    while (max.length && number > max[max.length - 1].value) {
        max.pop();
    }
    max.push(struct);
}

// 出队
function pop() {
    // 队列就没元素
    if (!data.length) {
        throw new Error('no element in the queue');
    }
    // 弹出前，先把data的头部值和max的头部值比较比较
    if (data[0].index === max[0].index) {
        max.shift();
    }
    data.shift();
}

function getMax() {
    if (!max.length) {
        throw new Error('no element in the queue');
    }
    return max[0].value;
}
