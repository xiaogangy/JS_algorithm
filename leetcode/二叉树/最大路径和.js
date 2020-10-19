/**
 * @file 124. 二叉树的最大路径和
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function solution(root) {
    if (!root) {
        return 0;
    }
    const maxObj = {
        max: -Infinity
    };
    getMax(root, maxObj);
    return maxObj.max;
}

// 以当前节点为根节点的单侧最大路径和（不一定非要到叶子节点才算路径）
function getMax(root, maxObj) {
    if (!root) {
        return 0;
    }
    // 以左子节点为根节点的最大路径和
    let left = 0;
    if (root.left) {
        left = getMax(root.left, maxObj);
    }
    // 以右节点为根节点的最大路径和
    let right = 0;
    if (root.right) {
        right = getMax(root.right, maxObj);
    }

    left = left > 0 ? left : 0;
    right = right > 0 ? right : 0;

    // 比较之后更新一下max的值
    const value = Math.max(maxObj.max, left + right + root.val);
    maxObj.max = value;
    return Math.max(left, right) + root.val;
}

function testFunc() {
    const node1 = new TreeNode(-10);
    const node2 = new TreeNode(9);
    const node3 = new TreeNode(20);
    const node4 = new TreeNode(15);
    const node5 = new TreeNode(7);
    node1.left = node2;
    node1.right = node3;
    node3.left = node4;
    node3.right = node5;
    console.log(solution(node1));
}
testFunc();