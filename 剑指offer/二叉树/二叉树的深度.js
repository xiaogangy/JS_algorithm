/**
 * @description 二叉树的深度
 *
 * 思路：这道题相对比较简单，我们知道二叉树的深度等于从根节点出发，到叶子节点形成的路径的最大值。
 * 我们可以很快的得到一个递归思想，也就是一棵二叉树的深度，等于它左右子树的深度最大值加1，也就是加上
 * 根节点的高度。我们把二叉树的高度记为H(root)，也就是说H(root) = max(H(root.left, root,right)) + 1;
 * 因此我们能得以下的两种写法，第一种是剑指offer上的，第二种是我一开始做题时把这个题目当成回溯来做的写法。
 */

/**
 * 利用以上公式得到的最简单的写法
 * @param {*} pRoot 二叉树根节点
 */
function TreeDepth_1(pRoot) {
    // 判断是否是空树，也是递归的终止条件
    if (!pRoot) {
        return 0;
    }

    const left = TreeDepth_1(pRoot.left);
    const right = TreeDepth_1(pRoot.right);

    return Math.max(left, right) + 1;
}

/**
 * 这种方法是我之前做回溯法找到的一些规律，也算是一种思路吧，和上面的方法
 * 没有什么优劣之分。思路是从根节点开始，自上而下的求最长路径，而上面的第一种
 * 解法有点像自下而上的思路。
 * @param {*} pRoot 二叉树根节点
 */
function TreeDepth(pRoot) {
    if (!pRoot) {
        return 0;
    }

    return TreeDepthCore(pRoot, 0);
}

/**
 * 表示从pRoot这个节点出发，能找到的最长路径，主要是在改变currentLength的长度
 * @param {*} pRoot 根节点
 * @param {*} currentLength 当前这条路上已经有的节点数量
 */
function TreeDepthCore(pRoot, currentLength) {

    // 先把当前这个节点算到路径里，给当前形成的路长加1
    currentLength = currentLength + 1;
    let left = currentLength;
    let right = currentLength;

    if (pRoot.left) {
        left = TreeDepthCore(pRoot.left, currentLength);
    }
    if (pRoot.right) {
        right = TreeDepthCore(pRoot.right, currentLength);
    }
    return Math.max(left, right);

}

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function testFunc() {
    const node1 = new TreeNode(10);
    const node2 = new TreeNode(5);
    const node3 = new TreeNode(12);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(7);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    console.log(TreeDepth_1(node1));
}

testFunc();