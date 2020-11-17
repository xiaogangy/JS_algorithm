/**
 * @desc 给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。
 * 考点：二叉树遍历的理解
 * solution：初看这道题，心想这特么也算是一道题？这不就是考中序遍历吗？把中序遍历输出出来，然后找到target节点的下一个节点，这不就完了？
 * 但是，这个方法忽略了题目中的一个重要条件，即“树中的每个节点还包含一个指向父节点的指针”，这样的话，考点肯定不止直接输出中序遍历这么简单了，直接输出
 * 中序遍历的话，时间复杂度自然也是O(n)。既然提供了指向父节点的指针，我们就来考虑一个更优的解法：
 * 中序遍历的顺序是 左 -> 根 -> 右，我们分别考虑一下当前这个节点是左根右的情况：
 * - 当前节点有右子树（也就是当前节点是根节点），按照中序遍历的定义，它的下一个节点一定是右子树的最左子节点；
 * - 当前节点没有右子树，分为两种情况：
 *  - 当前节点是父节点的左节点，那么下一个节点就是父节点
 *  - 当前节点是父节点的右节点，那么父节点肯定已经访问过了，我们还需要再往上找寻下一个节点。什么时候算找到了呢？直到找到一个节点，这个节点是父节点的左节点，这时候，这个节点的
 *    父节点就是下一个节点。
 * 这样的话，时间复杂度就下降了不少……
 */

/*
    function TreeLinkNode(x){
        this.val = x;
        this.left = null;
        this.right = null;
        this.next = null;
    }
*/

/**
 * 寻找二叉树中序遍历的下一个节点
 * @param {*} pNode 当前节点，寻找它的下一个节点
 * @return {Object} 返回下一个节点
 */
function getNext(pNode) {
    // 健壮性判断
    if (!pNode) {
        return null;
    }
    let pNext = null;
    let pCurrent = pNode;
    // 1. 当前节点有右子树
    if (pNode.right) {
        pCurrent = pNode.right;
        while (pCurrent.left) {
            pCurrent = pCurrent.left;
        }
        return pCurrent;
    }
    // 2. 当前节点没有右子树(包含了两种情况，当前节点是父节点的左节点或者右节点)
    let pParent = pCurrent.next;
    while (pParent && pCurrent === pParent.right) {
        pCurrent = pParent;
        pParent = pCurrent.next;
    }
    pNext = pParent;

    return pNext;
}
