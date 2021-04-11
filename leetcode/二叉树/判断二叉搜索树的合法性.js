/**
 * @file 输入一棵二叉树，判断其是否是一个合法的BST
 *
 * 方法1：我们知道BST的中序遍历是有序的，所以最直观的办法就是把BST的中序遍历保存到数组里，然后判断数组是否升序。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 方法2：抽象！找递归！一棵合法的BST是什么样子的呢？当前节点大于左子树中的所有节点，小于右子树中的所有节点，那这就很好解决问题了，我们抽象出来一个函数，
 * 输入根节点，返回当前这棵树的最大值和最小值，我们再拿这些值和当前节点的值进行比较。显然这是一个后续遍历。
 * 时间复杂度：0(n)，空间复杂度：O(1) (不考虑递归栈的空间)
 *
 * 方法3：递归！前序遍历！上面方法2是后续遍历，其实前序遍历也可以解决。一直强调理解前序遍历要向理解回溯一样自然，待着一定的修改纵深出发。那么这里带的“修改”是什么呢？
 * 我们去往左子树的时候，根节点肯定是作为最大值的；通往右子树的时候，根节点肯定是作为最小值的。这咋整，两个都带上呗！体现在函数参数里，就是进入递归时，除了根节点，还要有
 * 最大值和最小值，这也符合我们的思路，因为在去往左子树的右子树时，最大值和最小值都必须携带的。
 * 时间复杂度：0(n)，空间复杂度：O(1) (不考虑递归栈的空间)
 */

// 方法2：后续遍历，返回当前树的最大值、最小值、是否合法
function isValidBST2(root) {
    return backTraverse(root).isValid;
}

function backTraverse(root) {
    if (!root) {
        return {
            max: null,
            min: null,
            isValid: true
        };
    }
    // 叶子节点
    if (!root.left && !root.right) {
        return {
            max: root.val,
            min: root.val,
            isValid: true
        };
    }
    // 先遍历左子树
    const left = backTraverse(root.left);
    // 再遍历右子树
    const right = backTraverse(root.right);
    // 和当前节点判断
    const {max: leftMax, min: leftMin, isValid: leftValid} = left;
    const {max: rightMax, min: rightMin, isValid: rightValid} = right;
    const leftTrue = leftMax === null || root.val > leftMax;
    const rightTrue = rightMin === null || root.val < rightMin;
    const isValid = leftValid && rightValid && leftTrue && rightTrue;

    return {
        min: leftMin === null ? root.val : Math.min(leftMin, root.val),
        max: rightMax === null ? root.val : Math.max(rightMax, root.val),
        isValid
    };
}

// 方法3：前序遍历。带着最大值和最小值往下钻，当然还是得先确定这个函数返回啥，肯定是返回true或者false咯
function isValidBST3(root) {
    return preTraverse(root, null, null);
}

function preTraverse(root, max, min) {
    if (!root) {
        return true;
    }
    // 注意：如果返回true的条件不好写，可以考虑返回false的情况，这样排除以后就是正确的。
    // 比如这里，什么时候应该返回true呢？如果min和max一直有值，那很好判断，但是min和max一开始初始化为null，
    // 这样的话就会增加很多判断，不妨写成判断何时返回false即可。
    if (min !== null && root.val < min) {
        return false;
    }
    if (max !== null && root.val > max) {
        return false;
    }

    return preTraverse(root.left, root.val, min) && preTraverse(root.right, max, root.val);
}

function Node(value) {
    this.val = value;
    this.left = null;
    this.right = null;
}

function testFunc() {
    // 妈蛋，一直说写一个层序遍历反序列化的版本，这样写test的时候，就不用这么麻烦了！
    const node1 = new Node(10);
    const node2 = new Node(5);
    const node3 = new Node(15);
    const node4 = new Node(6);
    const node5 = new Node(20);
    node1.left = node2;
    node1.right = node3;
    node3.left = node4;
    node3.right = node5;
    console.log(isValidBST2(node1));
    console.log(isValidBST3(node1));
}
testFunc();