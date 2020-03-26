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
 * 这里只是根据前序遍历构建一种可能的二叉树
 */
function createBinaryTree(inputList) {
    // 用来track二叉树或其子树的头结点
    let currentNode = null;
    if (inputList === null || inputList.length === 0) {
        return null;
    }

    let currentData = inputList.shift();
    // 这里判断为空很关键，如果当前元素为空，则不再进行下一步递归
    if(currentData !== null) {
        currentNode = new TreeNode(currentData);
        currentNode.leftChild = createBinaryTree(inputList);
        currentNode.rightChild = createBinaryTree(inputList);
    }
    return currentNode;

}

// 前序遍历
function preOrderTraverse(rootNode) {
    if (rootNode === null) {
        return;
    }
    console.log(rootNode.data);
    preOrderTraverse(rootNode.leftChild);
    preOrderTraverse(rootNode.rightChild);
}

// 中序遍历
function inOrderTraverse(rootNode) {
    if (rootNode === null) {
        return;
    }
    inOrderTraverse(rootNode.leftChild);
    console.log(rootNode.data);
    inOrderTraverse(rootNode.rightChild);
}

// 后序遍历
function postOrderTraverse(rootNode) {
    if (rootNode === null) {
        return;
    }
    postOrderTraverse(rootNode.leftChild);
    postOrderTraverse(rootNode.rightChild);
    console.log(rootNode.data);
}

function TestFunc() {
    const arr = [3, 2, 9, null, null, 10, null, null, 8, null, 4];
    const binaryTree = createBinaryTree(arr);

    console.log('前序遍历');
    preOrderTraverse(binaryTree);
    console.log('中序遍历');
    inOrderTraverse(binaryTree);
    console.log('后序遍历');
    postOrderTraverse(binaryTree);
}
