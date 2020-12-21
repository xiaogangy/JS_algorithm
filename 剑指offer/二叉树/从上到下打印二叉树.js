/**
 * @description 不分行从上到下打印二叉树。举个例子，二叉树的结构如下：
 *      8
 *     / \
 *    6   10
 *   / \  / \
 *  5  7 9  11
 *
 * solution：这道题比较简单，就是考察二叉树的层序遍历，最直观的办法就是用队列实现，递归较为复杂，此处就不实现了。
 */

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

/**
 * 层序遍历
 * @param {*} root 二叉树根节点
 */
function printFromTopToBottom(root) {
    const result = [];
    // 空树
    if (!root) {
        return [];
    }

    // 声明一个数组来模拟队列
    const queue = [];
    queue.push(root);
    let currentNode = null;

    while (queue.length) {
        currentNode = queue.shift();
        result.push(currentNode.val);
        // 把左右子节点再放入队列中
        currentNode.left && queue.push(currentNode.left);
        currentNode.right && queue.push(currentNode.right);
    }

    return result;
}

/**
 * 分行从上到下打印二叉树
 *
 * 方法1：由于要分行打印，所以我们需要知道两个值，当前这个行总共有多少个值，我们打印了多少个值，根据这两个值从而可以确定当前行是否打印完了
 *
 * 方法2：我们可以设置两个队列，假设为A和B，用来交叉保存下一行的数据。比如我们把根节点的那一行数据放在队列A，然后不断弹出A中的值，弹出一个值就把它的
 * 左右子节点放到队列B中，直到队列A中的值为空。然后开始弹出队列B中的值，同样的，每弹出一个值的时候，就把它的左右子节点放到队列A中。重复进行以上逻辑，直到
 * 两个队列A和B都为空。这种思路就不实现了，本质上与方法1是一致的，但是个人感觉更清晰。
 * @param {*} root 根节点
 */
function printExtension1(root) {
    // 空树
    if (!root) {
        return [];
    }

    const result = [];
    // 声明一个数组来模拟队列
    const queue = [];
    queue.push(root);
    let currentNode = null;

    // 当前行还剩多少没打印（初始化为1是表示当前层级在根节点层级）
    let toBePrinted = 1;
    // 下一行总共有多少个节点
    let amountOfNextLevel = 0;
    // 保存每一行节点的数组
    let lineArray = [];

    while (queue.length) {
        currentNode = queue.shift();
        lineArray.push(currentNode.val);
        toBePrinted--;
        // 把左右子节点再放入队列中
        if (currentNode.left) {
            queue.push(currentNode.left);
            amountOfNextLevel++;
        }
        if (currentNode.right) {
            queue.push(currentNode.right);
            amountOfNextLevel++;
        }
        // 如果toBePrinted减为0，说明当前这一行已经没有节点要打印了，把lineArray直接填到result中
        if (toBePrinted === 0) {
            result.push(lineArray);
            lineArray = [];
            // 把这两个追踪值更新到最新的一行
            toBePrinted = amountOfNextLevel;
            amountOfNextLevel = 0;
        }

    }

    return result;
}


/**
 * 之字形打印二叉树，即第一行从左到右，第二行从右到左，第三行再从左到右，以此类推。
 *
 * 方法1：在第一行从左到右输出节点8后，第二行要从右到左输出10 -> 6，但是我们是从左到右把子节点保存的啊，先入后出？用栈就可以了！
 * 那么第三行呢？我们在弹出第二层的时候，先弹出了10，然后压入它的子节点9和11，但是在第三层弹出的时候，又是从左到右的，显然这又是一个
 * 先进后出的结果，我们需要再用一个栈来保存，只不过这个栈有点特殊，其实也不是这个栈特殊，而是压入这个栈的时候顺序比较特殊。这里我们要区分
 * 一下奇数行和偶数行，奇数行的时候我们从左到右输出，这一行节点的子节点入栈的顺序也是先压入左子节点再右子节点。但是在偶数行呢，例如第二行，
 * 我们在弹出节点10的时候，要压入入节点9和11，但是这一次我们先压入右子节点再左子节点，这样的话，顺序就又正常了。不断重复上述操作，直到两个栈都为空。
 *
 * 方法2：方法1总感觉有点复杂。我们上面分行打印方法2的思路，用两个队列（数组）来交替保存下一行的数据，然后根据当前是奇数行还是偶数行，选择逆序还是
 * 顺序打印当前队列中的元素。这个方法，感觉思路上要清晰不少，所以这里不用剑指offer上的实现了，按照自己思路实现一下。
 * @date 2020.12.21，仔细瞅了瞅，下面的写法还是和方法1基本一致的
 * @param {*} root 根节点
 */
function printExtension2(root) {
    // 空树
    if (!root) {
        return [];
    }

    const result = [];
    // 声明两个数组来交替保存树一层的节点，其实就是A保存奇数行的数据，B保存偶数行的数据
    const arrA = [];
    const arrB = [];
    // 是否是奇数行
    let isOdd = true;
    arrA.push(root);

    // 只要二者有一个没空，就继续循环
    while (arrA.length || arrB.length) {
        let lineArray = [];
        // 奇数行
        if (isOdd) {
            while (arrA.length) {
                const currentNode = arrA.shift();
                lineArray.push(currentNode.val);
                currentNode.left && arrB.push(currentNode.left);
                currentNode.right && arrB.push(currentNode.right);
            }
            result.push(lineArray);
            isOdd = false;
        } else {
            while (arrB.length) {
                const currentNode = arrB.pop();
                lineArray.push(currentNode.val);
                currentNode.right && arrA.unshift(currentNode.right);
                currentNode.left && arrA.unshift(currentNode.left);
            }
            result.push(lineArray);
            isOdd = true;
        }
    }

    return result;
}


function testFunc() {
    const node1 = new TreeNode(8);
    const node2 = new TreeNode(6);
    const node3 = new TreeNode(10);
    const node4 = new TreeNode(5);
    const node5 = new TreeNode(7);
    const node6 = new TreeNode(9);
    const node7 = new TreeNode(11);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;
    console.log(printExtension2(node1));
}

testFunc();
