/**
 * @file 二叉树的构建与遍历
 * 遍历可以分为前序遍历，中序遍历，后序遍历以及层序遍历
 * 按照更宽泛的划分，可以分为深度优先遍历和广度优先遍历，其中前序、中序、后序遍历属于深度优先遍历，层序遍历属于广度优先遍历
 */

// 二叉树节点
class TreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

/**
 * 事实上，二叉树的前序、中序和后序序列中的任何一个都不能唯一确定一棵二叉树，想要确定唯一的二叉树结构，需要根据前序+中序或者中序+后序来确定
 * 但是！如果你在序列化二叉树的时候，把空节点也保存了，那就可以唯一反序列化一棵二叉树了，因为我们遇到null值，就知道到了叶子节点了嘛……
 * 这里是根据一个前序遍历序列反序列化出来的唯一二叉树
 */
function createBinaryTree(inputList) {
    // 用来track二叉树或其子树的头结点
    let currentNode = null;
    if (inputList === null || inputList.length === 0) {
        return null;
    }

    let currentData = inputList.shift();
    // 这里判断为空很关键，如果当前元素为空，则不再进行下一步递归
    if (currentData !== null) {
        currentNode = new TreeNode(currentData);
        currentNode.leftChild = createBinaryTree(inputList);
        currentNode.rightChild = createBinaryTree(inputList);
    }
    return currentNode;

}

// 前序遍历：根 -》 左 -》右
function preOrderTraverse(rootNode) {
    // 即是健壮性判断，也是递归的出口
    if (rootNode === null) {
        return;
    }
    console.log(rootNode.data);
    preOrderTraverse(rootNode.leftChild);
    preOrderTraverse(rootNode.rightChild);
}

// 中序遍历：左 -》 根 -》 右
function inOrderTraverse(rootNode) {
    if (rootNode === null) {
        return;
    }
    inOrderTraverse(rootNode.leftChild);
    console.log(rootNode.data);
    inOrderTraverse(rootNode.rightChild);
}

// 后序遍历：左 -》 右 -》 根
function postOrderTraverse(rootNode) {
    if (rootNode === null) {
        return;
    }
    postOrderTraverse(rootNode.leftChild);
    postOrderTraverse(rootNode.rightChild);
    console.log(rootNode.data);
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
}

testFunc();