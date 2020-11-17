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

/**
 * 从根节点出发，找到第k大的的节点
 * @param {*} pRoot 根节点
 * @param {*} k k值
 * @return {node} 第K大的节点
 */
function solution2(pRoot, k) {
    if (!pRoot || k <= 0) {
        return null;
    }
    const info = {
        k
    };
    return kthNode2(pRoot, info);
}

/**
 * 在之前的方法中，我们先用中序遍历完成了对树的所有节点访问，时间复杂度为O(n)，空间复杂度也是为O(n)（不包含递归调用栈的空间，这里只说借用的存储节点的数组）。
 * 其实我们并不需要完全遍历完二叉树，因为可能在遍历根节点的左子树时候就已经找到了第K大的节点；同时，我们在访问的过程中就可以进行计数，这样也不需要一个额外的数组来保存
 * 遍历过的节点，这样空间复杂度和时间复杂度都降低了不少。
 * 这个函数的作用就是从pRoot节点出发，找到第K大的节点
 *
 * 2020/11/18:
 * 明确递归的定义，这个函数表示在以当前节点为根节点的树中找第K大的节点，找到的话就返回回来，找不到的话就返回null值，但是都要更新全局变量k值
 * @param {*} pRoot 根节点
 * @param {*} info 保存k的信息，因为涉及到递归中修改，所以把k放到一个对象中
 * @return {node} 找到的节点
 */
function kthNode2(pRoot, info) {
    // 递归出口 && 健壮性判断
    if (!pRoot) {
        return null;
    }

    let target = null;

    // 左子树
    target = kthNode2(pRoot.left, info);

    // 根节点
    if (!target) {
        if (info.k === 1) {
            target = pRoot;
            return target;
        } else {
            // 表示越过根节点，要去右子树中找目标节点了
            info.k--;
        }
    }

    // 右子树
    if (!target) {
        target = kthNode2(pRoot.right, info);
    }

    return target;
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
    console.log(solution2(node1, 3));
}
testFunc();