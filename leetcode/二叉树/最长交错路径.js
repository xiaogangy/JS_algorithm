function Node(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 
 * @param {*} root 当前出发的节点
 * @param {*} currentPath 当前交错路径长
 * @param {*} direction 当前节点是从哪个方向来的
 */
function findLongestZigzagPath(root, currentPath, direction, max) {
    if (direction === 'left') {
        if (root.right) {
            findLongestZigzagPath(root.right, currentPath + 1, 'right', max);
        } else {
            max.val = max.val > currentPath ? max.val : currentPath;
            return;
        }
    }
    if (direction === 'right') {
        if (root.left) {
            findLongestZigzagPath(root.left, currentPath + 1, 'left', max);
        } else {
            max.val = max.val > currentPath ? max.val : currentPath;
            return;
        }
    }
}

const max = {val: 0};
function solution(root) {
    if (!root) {
        return null;
    }
    root.left && findLongestZigzagPath(root.left, 1, 'left', max);
    root.right && findLongestZigzagPath(root.right, 1, 'right', max);

    root.left && solution(root.left);
    root.right && solution(root.right);
    return max.val;
}

function test() {
    const node1 = new Node(1);
    const node2 = new Node(1);
    const node3 = new Node(1);
    const node4 = new Node(1);
    const node5 = new Node(1);
    const node6 = new Node(1);
    const node7 = new Node(1);
    const node8 = new Node(1);
    node1.right = node2;
    node2.left = node3;
    node2.right = node4;
    node4.left = node5;
    node4.right = node6;
    node5.right = node7;
    node7.right = node8;
    solution(node1);
}

test();