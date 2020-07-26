/**
 * @desc 给定一棵二叉搜索树，请找出其中的第k小的结点。例如，在[5，3，7，2，4，6，8]中，按结点数值大小顺序第三小结点的值为4。
 *
 * solution: 这道题比较简单，我们知道二叉搜索树的中序遍历就是有序数组，所以只需要进行中序遍历，然后寻找第k个元素就可以了。
 */

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function kthNode(pRoot, k) {
    if (!pRoot || k <= 0) {
        return null;
    }
    const result = [];
    inOrderTrans(pRoot, result);

    return result[k - 1];
}

/**
 * 二叉树的中序遍历
 * @param {*} pRoot 二叉树
 * @param {*} result 遍历结果数组
 */
function inOrderTrans(pRoot, result) {
    if (!pRoot) {
        return null;
    }
    // 左节点
    inOrderTrans(pRoot.left, result);
    // 根节点
    result.push(pRoot);
    // 右节点
    inOrderTrans(pRoot.right, result);
}

function testFunc() {
    const node1 = new TreeNode(5);
    const node2 = new TreeNode(3);
    const node3 = new TreeNode(7);
    const node4 = new TreeNode(2);
    const node5 = new TreeNode(4);
    const node6 = new TreeNode(6);
    const node7 = new TreeNode(8);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;
    console.log(kthNode(node1, 3));
}
testFunc();