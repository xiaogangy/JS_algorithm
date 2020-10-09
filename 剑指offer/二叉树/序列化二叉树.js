/**
 * @desc 请实现两个函数，分别用来序列化和反序列化二叉树。
 * 二叉树的序列化是指：把一棵二叉树按照某种遍历方式的结果以某种格式保存为字符串，从而使得内存中建立起来的二叉树可以持久保存。
 * 序列化可以基于先序、中序、后序、层序的二叉树遍历方式来进行修改，序列化的结果是一个字符串，序列化时通过 某种符号表示空节点（$），以','表示一个结点值的结束。
 * 二叉树的反序列化是指：根据某种遍历顺序得到的序列化字符串结果str，重构二叉树。
 *
 * 思路：序列化的方法很简单，就是单纯的四种遍历实现，但是这里要注意一个点，我们知道单纯根据二叉树的一个遍历顺序是没法唯一确定一棵二叉树的，为了使序列化之后我们在反序列化的
 * 时候可以得到原始的二叉树，我们需要把二叉树的空节点给保存起来，这样就能唯一确定一棵树的结构。在此处实现的时候，我们用'$'来表示空节点的null值。
 * 反序列化是根据字符串序列得到构建一棵二叉树，我们还是以前序遍历为例，我们的思路是先拿到字符串的第一个字符值，这就是二叉树的根节点，然后把这个值从字符串中剔除。再取字符串的第一个值，
 * 因为前序遍历的原因，我们知道这个值是根节点的左子树，然后继续按照上述操作进行。那什么时候终止呢？我们以当前节点是A为例，当我们把A节点插入到二叉树中后，此时从字符串中读取到一个null
 * 值，我们知道这是A节点的左节点，然后，此时就要转向到A的右节点了！此时再把字符串的第一个值插入到当前节点的右节点中，然后继续进行重复的操作。从分析中我们可以知道，这是一个很明显的递归操作，
 * 如果用循环实现，有多种判断条件，短时间内不好实现，所以就先用递归实现。
 * (其实这就是小灰算法中二叉树遍历中二叉树的构造实现方法)
 */

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}


const list = [];
/**
 * 二叉树的序列化，以前序遍历为例，空节点用$表示，节点之前用','连起来
 * @param {*} pRoot 二叉树根节点
 */
function serialize(pRoot) {
    // 即是健壮性的判断，也是递归的终止条件
    if (!pRoot) {
        list.push('$');
        return;
    }
    // 前序遍历：先把根节点插入到结果数组中
    list.push(pRoot.val);
    serialize(pRoot.left);
    serialize(pRoot.right);

    return list.join(',');
}

/**
 * 反序列化二叉树，也就是根据字符串构建一棵唯一确定的二叉树，这里用的也是前序遍历
 * @param {*} s 序列化之后的字符串
 */
function deserialize(s) {
    // 空二叉树
    if (!list.length) {
        return null;
    }

    let currentData = list.shift();
    let currentNode = null;
    // 注意这里的判断条件，如果读取到'$'直接就跳过了，递归的出口
    if (currentData !== '$') {
        currentNode = new TreeNode(currentData);
        currentNode.left = deserialize(list);
        currentNode.right = deserialize(list);
    }

    return currentNode;
}

function testFunc() {
    const node1 = new TreeNode(1);
    const node2 = new TreeNode(2);
    const node3 = new TreeNode(3);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(5);
    const node6 = new TreeNode(6);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node3.left = node5;
    node3.right = node6;
    const result = serialize(node1);
    console.log(result);
    console.log(deserialize(result));
}

testFunc();