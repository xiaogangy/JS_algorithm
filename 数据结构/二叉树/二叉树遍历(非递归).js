/**
 * @file 非递归版本的遍历实现
 * 通常来讲，递归的代码因为涉及到回溯的问题，可以用栈来实现非递归的版本
 */

const createStack = require('../栈与队列/stack');
const createQueue = require('../栈与队列/queue');

// 节点，用链表实现
class TreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

// 构建二叉树
function createBinaryTree(list) {
    if (list === null || list.length === 0) {
        return null;
    }
    // 追踪节点（当前正在访问的节点）
    let currentNode = null;
    let currentData = list.shift();

    if (currentData !== null) {
        currentNode = new TreeNode(currentData);
        currentNode.leftChild = createBinaryTree(list);
        currentNode.rightChild = createBinaryTree(list);
    }
    return currentNode;

}

// 前序遍历：根节点 -> 左节点 -> 右节点
// 代码的重点是：遇见节点的时候，就算访问过，即输出；把node保存到栈中只是为了方便找右节点
function preOrderTraverse(rootNode) {
    const stack = createStack(20);
    let currentNode = rootNode;

    while (currentNode !== null || !stack.isEmpty()) {
        // 迭代访问节点的左孩子，并入栈
        while (currentNode !== null) {
            console.log(currentNode.data);
            stack.push(currentNode);
            currentNode = currentNode.leftChild;
        }
        // 如果节点没有左孩子，则弹出栈顶节点，即当前节点，访问节点的右孩子
        if (!stack.isEmpty()) {
            currentNode = stack.pop();
            currentNode = currentNode.rightChild;
        }
    }
}

// 中序遍历: 左节点 -> 根节点 -> 右节点
// 不同于前序遍历，遇见节点的时候不算访问过，要先入栈，弹出栈的时候才算访问过这个节点了；
function inOrderTraverse(rootNode) {
    const stack = createStack(20);
    let currentNode = rootNode;

    while (currentNode !== null || !stack.isEmpty()) {
        while (currentNode !== null) {
            // 本质上要先找到树的最左子节点，才能开始真正的中序遍历
            // 因此先不要输出，只是想让每个节点进栈，保存历史信息
            stack.push(currentNode);
            currentNode = currentNode.leftChild;
        }
        if (!stack.isEmpty()) {
            currentNode = stack.pop();
            console.log(currentNode.data);
            currentNode = currentNode.rightChild;
        }
    }
}

// 后序遍历：左节点 -> 右节点 -> 根节点
// 后序遍历的非递归版本是最为复杂的，要保证节点的左右子节点都已经访问过，才能弹出栈顶元素
function postOrderTraverse1(rootNode) {
    const stack = createStack(20);
    let currentNode = rootNode;
    // 标志位
    let lastVisited = null;

    while (currentNode !== null || !stack.isEmpty()) {
        while (currentNode !== null) {
            // 先入栈，出栈的时候再输出
            stack.push(currentNode);
            currentNode = currentNode.leftChild;
        }

        const parentNode = stack.peek();
        if (parentNode.rightChild === null || parentNode.rightChild === lastVisited) {
            console.log(stack.pop().data);
            lastVisited = parentNode;
        } else {
            currentNode = parentNode.rightChild;
        }
    }
}

// 上面的后续遍历方法中，使用了一个特殊的标志位来表示上一次访问的到的节点，从而防止陷入死循环
// 其实后序遍历还有一个非常巧妙的方法，后序遍历是左 -> 右 -> 根，这个遍历顺序如果是根 -> 右 -> 左就好了，因为这完全就是
// 和前序遍历完全一样的写法，只不过换一下方向而已。所以我们其实可以结合前序遍历的写法，先写清楚根 -> 右 -> 左的遍历代码，
// 然后最后再逆序输出遍历结果
function postOrderTraverse2(rootNode) {
    if (rootNode === null) {
        return;
    }
    const stack = [];
    const values = [];
    let currentNode = rootNode;

    // 完全就是模仿前序遍历，写一个前序遍历的镜像版本
    while (currentNode !== null || stack.length > 0) {
        while (currentNode !== null) {
            stack.push(currentNode);
            // 等同于直接console.log的操作，但是这里要最后反转一次，所以先不要输出
            values.push(currentNode.data);
            currentNode = currentNode.rightChild;
        }
        if (stack.length > 0) {
            currentNode = stack.pop();
            currentNode = currentNode.leftChild;
        }
    }

    // 逆序输出values中的值
    console.log(values.reverse().join(','));
}

// 层序遍历
// 层序遍历要用队列实现，弹出根节点的同时，左右孩子节点同时入队列
function levelOrderTraverse(rootNode) {
    const queue = createQueue(20);
    !!rootNode && queue.offer(rootNode);
    while (!queue.isEmpty()) {
        const pollElement = queue.poll();
        // 注意这里，入队不叫访问过，弹出的时候才算访问过了
        console.log(pollElement.data);
        if (pollElement.leftChild) {
            queue.offer(pollElement.leftChild);
        }
        if (pollElement.rightChild) {
            queue.offer(pollElement.rightChild);
        }
    }
}


function testFunc() {
    const arr = [3, 2, 9, null, null, 10, null, null, 8, null, 4];
    const binaryTree = createBinaryTree(arr);

    console.log('前序遍历');
    preOrderTraverse(binaryTree);
    console.log('中序遍历');
    inOrderTraverse(binaryTree);
    console.log('后序遍历1');
    postOrderTraverse1(binaryTree);
    console.log('后序遍历2');
    postOrderTraverse2(binaryTree);
    console.log('层序遍历');
    levelOrderTraverse(binaryTree);
}

testFunc();
