/**
 * @description 输入一颗二叉树和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
 *
 * 思路：这道题的解法就是从根节点开始不断的向下访问它的子节点，把子节点的值加起来，直到遇到叶子节点，然后判断和是不是等于预期的值。如果是，那就找到一条路径，把这些
 * 节点输出出来；如果和不满足，那就弹出最后插入的这个节点，填充倒数第二个节点的另外一个子节点，再求这条路径的和。从这个思路来看，这就是用回溯法解决问题。那么这道题
 * 需要注意哪些方面呢？
 * 1. 我们需要一个数组，更准确的说是一个栈，来保存我们从根节点开始，不断填入栈中的值，这样才能在最后满足要求时输出完整的路径。
 * 2. 回溯法解决问题，我们通常用递归来实现，也就说对于减小问题规模后，我们仍然采用同样的方法来解决问题。那么这道题的递归逻辑是什么呢？
 * - 就是我们从一个节点出发，结合当前已经获得的和，能找到和为预期值的所有路径。在每一轮递归中，会更新当前已经获得的和，这个值是贯穿在整个递归过程中的。
 * 但是我们还需要注意，我们使用了一个栈来保存不断填入的节点，那么当一个叶子节点访问过后，无论它形成的这条路径，是否满足了预期的和，我们在寻找下一条路径的时候，都需要
 * 将之前填入的节点弹出，因为它已经访问过了。（这有点类似于之前做回溯时候，用来标记哪些点被访问过的布尔矩阵）
 */

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function FindPath(root, expectNumber) {
    if (!root) {
        return [];
    }
    // 声明一个栈，用来保存当前访问的路径上的节点
    const paths = [];
    const result = [];
    findPathCore(root, paths, 0, expectNumber, result);
    return result;
}

/**
 * 从当前节点出发，给定已经入栈的一些节点，找到所有的节点值的和为目标值的路径，并输出出来
 * @param {*} pRoot 递归开始的根节点
 * @param {*} paths 当前路径上已有的节点
 * @param {*} currentSum 当前路径上节点的和
 * @param {*} expectedSum 预期的和
 * @param {*} result 结果数组，用来保存找到的一条路径
 */
function findPathCore(pRoot, paths, currentSum, expectedSum, result) {

    // 1. 先把当前节点插入到路径栈中，然后更新当前栈的和
    paths.push(pRoot.val);
    currentSum = currentSum + pRoot.val;

    // 判断当前节点是不是叶子节点
    const isLeaf = !pRoot.left && !pRoot.right;
    // 2. 如果当前节点是叶子节点，而且栈中的和等于预期和，说明我们找到了一条有效路径
    if (isLeaf && currentSum === expectedSum) {
        result.push([...paths]);
    }

    // 3. 如果当前还不是叶子节点，我们就让递归开始，也就是更新了currentSum和paths后，进入新的一次探索
    if (pRoot.left) {
        findPathCore(pRoot.left, paths, currentSum, expectedSum, result);
    }
    if (pRoot.right) {
        findPathCore(pRoot.right, paths, currentSum, expectedSum, result);
    }

    // 4. 这里一定不能忘记，在步骤1中我们把pRoot添加进来了，那么走到这一步的时候，显然是pRoot的左右子树都已经访问完了，
    // 这时候显然已经没啥用了，要把它弹出去才对，也就是说弹出去后栈顶元素才变为当前访问节点的父节点，才会去访问父节点的另外一个子节点。
    paths.pop();

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
    console.log(FindPath(node1, 22));
}

testFunc();