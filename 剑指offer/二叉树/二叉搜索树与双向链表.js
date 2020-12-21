/**
 * @description 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。
 *
 * 思路：这道题一开始看的剑指offer的题解，心中一万头草泥马啊，这递归递的我看不懂啊，还用的C++指针的指针，任凭我不服输的看到凌晨两点，随着年龄增长日益钝化的脑子
 * 还是选择了死记硬背，并且不断安慰自己，这道题这么复杂，肯定是hard级别的，网上肯定大把人做不出来这道题。结果我到牛客上一看，MMP，中等难度，而且通过率极高！沃日，
 * 我心态崩了啊。不得解，遂看pass的题解，发现网友的解法异常清晰且好懂，就用这种方法解答一下。
 *
 * 回到这道题本身，这道题是把二叉搜索树转成双向链表。二叉树节点本身有两个指针，这对转成双向链表有天然的优势，那么二叉搜索树转成排序的双向链表？？？二叉搜索树，它进行
 * 中序遍历就是有序的了啊，有序的双向链表？？这不就是一道简简单单的中序遍历吗！！我们只要把遍历访问到的节点放到一个数组中，然后把数组中的这些节点前后连接起来不就好了么！
 *
 * 感触：做题啥的虽然追求多方法多思路，但是如果对某种方法实在理解不了，也不要钻牛角尖或者赌气必须看懂，条条大道通罗马呢是不，也不要盲信权威，书本上的题解它不一定就是最优解法，
 * 学会自己思考，多看别人的解题思路，才会有进步滴！
 */

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function Convert(pRootOfTree) {
    // 空树直接返回
    if (!pRootOfTree) {
        return null;
    }
    const nodeArray = [];
    // 中序遍历把节点都放进数组
    inOrderTrans(pRootOfTree, nodeArray);

    // 将数组中相邻的节点连接起来
    for (let i = 0; i < nodeArray.length; ++i) {
        const currentNode = nodeArray[i];
        currentNode.left = nodeArray[i - 1] || null;
        currentNode.right = nodeArray[i + 1] || null;
    }

    return nodeArray[0];
}

/**
 * 按照中序遍历的顺序，把节点都放到数组中
 * @param {*} root 根节点
 * @param {*} array 节点数组
 */
function inOrderTrans(root, array) {
    // 递归终止条件
    if (!root) {
        return;
    }
    inOrderTrans(root.left, array);
    array.push(root);
    inOrderTrans(root.right, array);
}


/**
 * 方法二：思路还是递归，先将左子树变成排序双向链表，再将右子树变成双向链表，然后二者和中点值连起来
 * @param {*} root 根节点
 * @return {*} 新的根节点
 */
function solution2(root) {
    if (!root) {
        return null;
    }
    return recursive(root).begin;
}

function recursive(root) {
    if (root === null) {
        return null;
    }
    if (!root.left && !root.right) {
        return {
            begin: root,
            end: root
        };
    }
    const left = recursive(root.left);
    const right = recursive(root.right);

    if (left) {
        root.left = left.end;
        left.end.right = root;
    }
    if (right) {
        root.right = right.begin;
        right.begin.left = root;
    }

    return {
        begin: left ? left.begin : root,
        end: right ? right.end : root
    };
}

/**
 * 方法3：这种方法记录了last指针，抽象性更强
 * @param {*} root 根节点
 * @return {Object} 新的头节点
 */
function recursiveMethod(root) {
    if (!root) {
        return null;
    }
    let head = {
        newHead: null
    };
    const last = {
        val: null
    };
    connect(root, last, head);
    return head.newHead;
}

function connect(root, last, head) {
    if (!root) {
        return;
    }
    // 1. 先把左边的变成有序链表
    connect(root.left, last, head);
    // 2. 把last和当前root节点连起来，并更新last
    if (!last.val) {
        last.val = root;
        head.newHead = root;
    } else {
        const lastNode = last.val;
        lastNode.right = root;
        root.left = lastNode;
        last.val = root;
    }
    connect(root.right, last, head);
}

function testFunc() {
    const node1 = new TreeNode(1);
    const node2 = new TreeNode(2);
    const node3 = new TreeNode(3);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(5);
    const node6 = new TreeNode(6);
    node3.left = node2;
    node3.right = node5;
    node2.left = node1;
    node5.left = node4;
    node5.right = node6;
    // console.log(solution2(node3));
    console.log(recursiveMethod(node3));
}
testFunc();