/**
 * @desc 输入两棵二叉树A和B，判断B是不是A的子结构。(规定空树不为任何一棵树的子结构)
 *
 * 思路：要查找树A中是否存在和树B结构一样的子树，我们可以分为两步：
 * 1. 在树A中找到和树B的根节点的值一样的节点R
 * 2. 判断树A中以R为根节点的子树是不是包含和树B一样的结构
 * 从上述两个步骤中我们可以发现，涉及到的知识点包括二叉树的遍历，自然也会涉及到递归
 */

/**
 * 判断树B是否是树A的子结构
 * @param {*} pRoot1 树A
 * @param {*} pRoot2 树B
 */
function hasSubtree(pRoot1, pRoot2) {
    let result = false;

    // 还是要先判断树A和树B是否是棵空树
    if (pRoot1 && pRoot2) {
        // 其实这个if语句不写也行，因为在doesTree1HaveTree2中已经判断二者是否相等了
        // 只是这样写，会让逻辑更加清晰：即先确定二者根节点是否相等，相等的话进行子树比较；不相等的话，直接换一个根节点比较
        if (pRoot1.val === pRoot2.val) {
            result = doesTree1HaveTree2(pRoot1, pRoot2);
        }
        // 判断在树A的左子树中是否能找到一个树B的结构
        if (!result) {
            result = hasSubtree(pRoot1.left, pRoot2);
        }
        // 判断在树A的右子树中是否能找到一个树B的结构
        if (!result) {
            result = hasSubtree(pRoot1.right, pRoot2);
        }
    }

    return result;
}

/**
 * 递归函数：判断从当前节点出发的树B是不是树A的子结构
 * @param {*} pRoot1 树A
 * @param {*} pRoot2 树B
 */
function doesTree1HaveTree2(pRoot1, pRoot2) {

    // 注意如下这些递归终止条件
    // 当pRoot2成为了空指针，说明某个分支上已经判断完了，自然说明这条路径上树A是包含树B的，所以返回true
    if (!pRoot2) {
        return true;
    }
    // 如果pRoot1变为了空指针，而pRoot2不是，说明树A的这条路径明显不够树B的路径，所以返回false
    if (!pRoot1) {
        return false;
    }
    // 如果判断到某一个节点的时候，发现值不同了，自然也要结束递归
    if (pRoot1.val !== pRoot2.val) {
        return false;
    }

    return doesTree1HaveTree2(pRoot1.left, pRoot2.left) && doesTree1HaveTree2(pRoot1.right, pRoot2.right);
}