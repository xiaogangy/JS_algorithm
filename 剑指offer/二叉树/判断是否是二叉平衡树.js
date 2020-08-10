/**
 * @desc 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左、右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
 *
 * 考点：后序遍历
 * 思路：我们用递归的思想来思考一下这个题目，如果我们知道一棵树的两个子树是不是平衡二叉树了，是不是我们也就知道当前这棵树是不是平衡二叉树了？
 * 所以递归如何减小问题规模的思路就出来了，平衡二叉树的两颗子树一定是是平衡二叉树。所以要先判断两颗子树是不是平衡二叉树，然后再判断根树是不是平衡二叉树，
 * 这就是我们的后序遍历。但是在由子树来判断根树是不是二叉平衡树的时候，我们需要知道两棵子树的高度，只有当两棵子树的高度差不大于1时，根树才是平衡二叉树，这样
 * 我们就知道了问题的递归出口。
 *
 */

function isBalanced(pRoot) {
    // 一棵空树肯定是平衡二叉树
    if (!pRoot) {
        return true;
    }

    // height存储这棵树的高度
    const info = {
        height: 0
    };
    return isBalancedCore(pRoot, info);
}

/**
 * 本质上是判断一棵树是不是平衡二叉树，但是同时要更新这棵树的高度
 * @param {*} pRoot 二叉树
 * @param {*} info 存储二叉树相关信息
 * @return {boolean} 是否是平衡二叉树
 */
function isBalancedCore(pRoot, info) {
    if (!pRoot) {
        info.height = 0;
        return true;
    }
    // 减小问题规模
    const leftInfo = {};
    const rightInfo = {};
    if (isBalancedCore(pRoot.left, leftInfo) && isBalancedCore(pRoot.right, rightInfo)) {
        // 子树的高度差
        const d = leftInfo.height - rightInfo.height;
        if (d >= -1 && d <= 1) {
            info.height = Math.max(leftInfo.height, rightInfo.height) + 1;
            return true;
        }
    }

    return false;
}
