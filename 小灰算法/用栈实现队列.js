/**
 * @description 用栈来模拟一个队列，要求实现队列的两个基本操作入队，出队
 * solution: 栈为先进后出的线性结构，可以考虑利用两个栈来实现队列，具体操作如下：
 * - 使用两个栈A和B
 * - 当有元素要插入时，把元素都推入到栈A中
 * - 当要出栈时，先把A中的所有元素，按照出栈顺序，依次推入到栈B中，这个时候再弹出栈B的栈顶元素
 * - 当要继续出栈时，还是弹出栈B的栈顶元素，直到栈B为空
 * - 这时候，如果又想插入元素，则还是把元素插入到栈A
 * - 当栈B为空时且要继续弹出元素时，再把栈A的全部元素推入到栈B，以后的逻辑类似
 */

function createQueueWithStack(length) {

    const stackA = createStack(length);
    const stackB = createStack(length);

    // 插入元素
    function offer(data) {
        // 直接插入，判断栈是否已满的逻辑已经在stack中实现了
        stackA.push(data);
    }

    // 弹出元素
    function poll() {
        // 如果栈A和栈B都为空，则报错
        if (stackA.isEmpty() && stackB.isEmpty()) {
            throw new Error('队列为空');
        }
        // 如果栈B不为空，直接弹出栈B的栈顶元素
        if (!stackB.isEmpty()) {
            return stackB.pop();
        }
        // 如果栈B为空，栈A不为空，则把栈A中的元素，全部导入到栈B中
        if (stackB.isEmpty() && !stackA.isEmpty()) {
            while (!stackA.isEmpty()) {
                stackB.push(stackA.pop());
            }
            return stackB.pop();
        }
    }

    return {offer, poll};
}

function createStack(capacity) {
    // 这是一个私有变量，JS没有private属性，就用这  种方式实现吧
    const arr = new Array(capacity);
    // 栈顶
    let top = -1;

    // 入栈
    function push(item) {
        if (top === arr.length - 1) {
            throw new Error('栈已满');
        }
        top++;
        arr[top] = item;

    }
    // 出栈
    function pop() {
        if (top === -1) {
            throw new Error('栈为空');
        }
        const topItem = arr[top];
        top--;
        return topItem;
    }
    // 打印栈中所有元素，从栈底到栈顶，从左往右，符合习惯
    function log() {
        for (let i = 0; i <= top; i++) {
            console.log(arr[i]);
        }
    }
    // 判断栈是否为空
    function isEmpty() {
        return top === -1;
    }
    // 读取栈顶元素，不弹出
    function peek() {
        return arr[top];
    }

    return {pop, push, log, isEmpty, peek};
}

function test() {
    const stackQueue = createQueueWithStack(5);
    stackQueue.offer(1);
    stackQueue.offer(2);
    stackQueue.offer(3);
    console.log(stackQueue.poll());
    console.log(stackQueue.poll());
    // console.log(stackQueue.poll());
    // 这一次应该会报错
    // console.log(stackQueue.poll());
    stackQueue.offer(4);
    stackQueue.offer(5);
    console.log(stackQueue.poll());
    console.log(stackQueue.poll());
    console.log(stackQueue.poll());
}

test();