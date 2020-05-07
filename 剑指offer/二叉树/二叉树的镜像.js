/**
 * @desc 请完成一个函数，输入一棵二叉树，将其变换为源二叉树的镜像。
 *
 * 思路：对于较为抽象的一些问题，如果一开始没有思路，可以尝试画一下图，画图会让你的思维变得具象，然后可以发现一些求解问题的思路。
 * 通过画图我们可以发现，想求一棵树的镜像，我们可以先把根节点的两个子树交换一下位置。然后对左右子树分别再做镜像，也就是同样的操作，
 * 可以发现，这就是递归的过程，那么终止条件呢？当当前节点有左子树或者右子树的时候，做交换，如果都没有，就终止了。
 *
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

/**
 * 改变二叉树得到镜像
 * 其实这里是用的前序遍历来做的节点遍历，所以再次强调二叉树遍历的重要性
 * @param {*} root 源二叉树
 */
function mirror(root) {
    // 空树
    if (!root) {
        return;
    }
    // 树只有一个节点
    if (!root.left && !root.right) {
        return;
    }

    // 先变化根节点的两棵子树
    let temp = root.right;
    root.right = root.left;
    root.left = temp;

    // 递归给左右子树做镜像
    if (root.left) {
        mirror(root.left);
    }
    if (root.right) {
        mirror(root.right);
    }
}