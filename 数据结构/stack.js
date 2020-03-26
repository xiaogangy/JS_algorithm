/**
 * 栈是一种逻辑结构，特点是先进后出，可以通过数组或者链表实现
 * 应用：具有回溯的特点，递归算法的非递归版本通常可以用栈实现；面包屑导航
 */

function createStack(capacity) {
    // 这是一个私有变量，JS没有private属性，就用这种方式实现吧
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

var stack = createStack(5);
stack.push(1);
stack.push({name: 1});
stack.push(2);
stack.log();
var topItem = stack.pop();
console.log(topItem);
stack.log();

module.exports = createStack;
