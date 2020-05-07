/**
 * @description 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
 *
 * 思路：从图像上我们可以到看到对称的二叉树左右两侧是完全一样的，如果我们不写算法单纯的自己进行比较，会发现步骤是，先检查根节点的左右子节点是否一样，
 * 如果一样的话，然后再判断左子树的左节点和右子树的右节点是否相等，同时判断，左子树的右节点和右子树的左节点是否相等。但是后续呢？我们发现这种每次只关注一个节点
 * 并比较一个节点的方法，对于问题层级增高的情况，显然不好求解，这就是对问题的抽象程度不好。
 * 我们换一种思路，在根节点的左右子节点相等之后，对于左右子树，其实我们需要做的就是判断二者是否互为镜像。我们知道前序遍历的顺序是根节点 -> 左节点 -> 右节点，
 * 我们可以再定义一种遍历顺序为前序遍历的对称顺序，即根节点 -> 右节点 -> 左节点。如果对左子树左前序遍历得到的结果和对右子树做对称遍历得到的结果一样的话，说明
 * 左右子树互为镜像。进一步的，直接对二叉树进行前序遍历和对称遍历得到的结果一致的话，说明该树是对称的。
 * 但是要注意的是，如果一棵二叉树所有的节点值都一样的话，那么对称遍历和前序遍历的结果自然是一样的，这时候我们没法判断是不是对称的，怎么避免这种情况呢？我们把空节点
 * 考虑进来就好了，也就是把它想象成一棵“满二叉树”，只不过一些节点是空的。
 */


function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

/**
 * 这里求解的思路是不断比较左右子树，但本质上还是判断前序遍历和对称遍历的顺序
 * @param {*} pRoot 源二叉树
 */
function isSymmetrical(pRoot) {
    return twoTreesAreSymmetrical(pRoot, pRoot);
}

/**
 * 判断两棵树是否互为镜像
 * @param {*} pRoot1 树1
 * @param {*} pRoot2 树2
 */
function twoTreesAreSymmetrical(pRoot1, pRoot2) {

    // 两颗树都是空树，自然是对称的
    if (!pRoot1 && !pRoot2) {
        return true;
    }
    // 一棵为空树，另外一棵不是，则不是对称的
    if (!pRoot1 || !pRoot2) {
        return false;
    }
    // 不要忘了最直观的比较
    if (pRoot1.val !== pRoot2.val) {
        return false;
    }
    return twoTreesAreSymmetrical(pRoot1.left, pRoot2.right)
        && twoTreesAreSymmetrical(pRoot1.right, pRoot2.left);
}

function testFunc() {
    const node1 = new TreeNode(8);
    const node2 = new TreeNode(6);
    const node3 = new TreeNode(6);
    const node4 = new TreeNode(5);
    const node5 = new TreeNode(7);
    const node6 = new TreeNode(7);
    const node7 = new TreeNode(5);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;
    console.log(isSymmetrical(node1));
}

testFunc();