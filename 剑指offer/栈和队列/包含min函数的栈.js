/**
 * @description 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的min函数。
 * 在该栈中，调用min、push及pop的时间复杂度都是O(1)。
 *
 * solution：这个问题在小灰算法中出现过，因此这里就不展开讲了，就是利用两个数组来实现栈结构，其中一个数组表示数据栈，
 * 另外一个数组追踪当前栈中的最小元素。
 */

// 数据栈
const stackA = [];
// min栈
const stackB = [];

// 推入元素
function push(node) {
    const lengthB = stackB.length;
    // 每次插入元素，都要和栈B的栈顶元素做比较，更小的元素才插入B
    // 这里要注意这个等号，因为数据栈中的最小元素有可能是重复的，如果相同元素没有插入到min栈，弹出就有问题
    if (!lengthB || stackB[lengthB - 1] >= node) {
        stackB.push(node);
    }
    stackA.push(node);
}

// 弹出元素
function pop() {
    const lengthA = stackA.length;
    const lengthB = stackB.length;
    if (!lengthA) {
        return null;
    }
    if (stackA[lengthA - 1] === stackB[lengthB - 1]) {
        stackB.pop();
    }
    return stackA.pop();
}

// 获取栈顶元素
function top() {
    const lengthA = stackA.length;
    if (!lengthA) {
        return null;
    }
    return stackA[lengthA - 1];
}

// 获取最小元素
function min() {
    const lengthB = stackB.length;
    if (!lengthB) {
        return null;
    }
    return stackB[lengthB - 1];
}