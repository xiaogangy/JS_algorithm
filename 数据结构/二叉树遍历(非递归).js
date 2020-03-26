/**
 * @file 非递归版本的遍历实现
 * 通常来讲，递归的代码因为涉及到回溯的问题，可以用栈来实现非递归的版本
 */

const createStack = require('./stack');
const createQueue = require('./queue');

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
function inOrderTraverse(rootNode) {
    const stack = createStack(20);
    let currentNode = rootNode;

    while (currentNode !== null || !stack.isEmpty()) {
        while(currentNode !== null) {
            // 先入栈，出栈的时候再输出
            stack.push(currentNode);
            currentNode = currentNode.leftChild;
        }
        if (!stack.isEmpty()) {
            currentNode = stack.pop();
            console.log(currentNode.data);
            currentNode = currentNode.rightChild
        }
    }
}

// 后序遍历：左节点 -> 右节点 -> 根节点
// 后序遍历的非递归版本是最为复杂的，要保证节点的左右子节点都已经访问过，才能弹出栈顶元素
function postOrderTraverse(rootNode) {
   const stack = createStack(20);
   let currentNode = rootNode;
   // 标志位
   let lastVisited = null;

   while (currentNode !== null || !stack.isEmpty()) {
       while(currentNode !== null) {
           // 先入栈，出栈的时候再输出
           stack.push(currentNode);
           currentNode = currentNode.leftChild;
       }

       const parentNode = stack.peek();
       if (parentNode.rightChild === null || parentNode.rightChild === lastVisited) {
           console.log(stack.pop().data);
           lastVisited = parentNode;
           // 注意此时这个currentNode设置为null，是为了想跳过上面的内层while循环；
           // 实际上是表示当前节点已经被访问过，它作为某个节点的左节点已经访问了，应该转向它的相邻节点，即它的父节点的右子节点
           currentNode = null;
       } else {
           currentNode = parentNode.rightChild;
       }

   }
}

// 层序遍历
// 层序遍历要用队列实现，弹出根节点的同时，左右孩子节点同时入队列
function levelOrderTraverse(rootNode) {
    const queue = createQueue(20);
    !!rootNode && queue.offer(rootNode);
    while (!queue.isEmpty()) {
        const pollElement = queue.poll();
        console.log(pollElement.data);
        if (!!pollElement.leftChild) {
            queue.offer(pollElement.leftChild);
        }
        if (!!pollElement.rightChild) {
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
    console.log('后序遍历');
    postOrderTraverse(binaryTree);
    console.log('层序遍历');
    levelOrderTraverse(binaryTree);
}

testFunc();
