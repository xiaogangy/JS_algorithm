/**
 * @description 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如输入前序遍历序列[1,2,4,7,3,5,6,8]和中序遍历序列[4,7,2,1,5,3,8,6]，则重建二叉树并返回。
 * 
 * solution: 先回顾知识点
 * - 前序遍历： 根 -》左 -》 右
 * - 中序遍历：左 -》 根 -》 右
 * - 后序遍历： 左 -》 右 -》 根
 * 前序遍历的第一个节点肯定是根节点，所以如上例子中1为根节点，根据这个根节点的值，我们可以找到根节点在中序遍历中输出的位置，即在数组索引3处；
 * 则中序遍历中1左边的即为左子树元素，右边的为右子树元素。那么前序遍历呢？我们可以根据中序遍历中确定的左子树中元素个数，来确定左子树的前序遍历，如题中
 * 以1为根节点的左子树，前序遍历为[2, 4, 7]，中序遍历为[4, 7, 2]。右子树依次类推
 * 这时候我们又得到了一个子二叉树的前序遍历和中序遍历，我们就发现可以用递归来解决这个问题了。
 *
 */


function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function binaryTreeRecons(preOrder, inOrder) {

    // 如果前序遍历和中序遍历的数组为空，直接返回null
    if (!preOrder.length || !inOrder.length) {
        return null;
    }

    // 1. 从前序遍历的第一个元素拿取根节点
    const rootValue = preOrder[0];
    const root = new TreeNode(rootValue);
    // 递归终止条件
    if (preOrder.length === 1 && inOrder.length === 1) {
        return root;
    }

    // 2. 在中序遍历中找到根节点的位置，并统计左右子树的节点个数
    let rootPos = 0;
    while (inOrder[rootPos] !== rootValue && rootPos < inOrder.length) {
        rootPos++;
    }
    if (rootPos === inOrder.length) {
        throw new Error('未找到根节点');
    }

    root.left = binaryTreeRecons(preOrder.slice(1, rootPos + 1), inOrder.slice(0, rootPos));
    root.right = binaryTreeRecons(preOrder.slice(rootPos + 1), inOrder.slice(rootPos + 1));

    return root;

}