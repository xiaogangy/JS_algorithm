/**
 * @file 图的深度优先遍历(DFS)
 * @desc 关于深度优先遍历的概念我们在二叉树中已经非常熟悉了，简而言之就是“一条道走到黑，走完了就回退走另外一条道”。那么对于比二叉树更泛型的图
 * 这种结构，如果实现深度优先遍历呢？
 *
 * 1. 邻接表
 * 选择要开始的起点，然后找到该顶点的链表中的第一个顶点，然后再取该顶点作为新的起点，再取其链表的第一个节点……显然这是一个递归的过程，也是标准的
 * 回溯算法。
 * 2. 邻接矩阵
 * 同样的，我们要选择一个顶点作为起点。然后判断当前这一行的第一个与其相连的顶点，然后作为新的起点，继续递归下去……
 * talk is cheap，其实非常简单，看下面代码就好了
 */

/**
 * 从一个顶点开始DFS(邻接表)
 * @param {*} root 起点
 * @param {*} isVisited 表示节点是否访问过的数组(也可以为哈希表，此处为了一般性，为哈希表)
 */
function DFS(root, isVisited) {
    // 健壮性不能少了
    if (!root) {
        return;
    }
    console.log(root.data);
    // 用的是map
    isVisited.set(root, true);
    let node = root.list;
    // 看！下面就是个标准的决策树选择，标准的回溯算法
    while (node !== null) {
        if (isVisited.get(node) !== true) {
            DFS(node, isVisited);
        }
        node = node.next;
    }
}

/**
 * 从一个顶点开始DFS(邻接矩阵)
 * 这里为了方便简单地描述思想，认为所有的顶点都是一些数值
 * @param {*} start 起点
 * @param {*} isVisited 表示节点是否访问过的数组(也可以为哈希表，此处为了方便，为一维数组)
 * @param {*} matrix 二维矩阵(其中数值0表示二者不相连，1表示二者相连)
 */
function DFS2(start, isVisited, matrix) {
    const currentRow = matrix[start];
    console.log(start);
    isVisited[start] = true;
    for (let i = 0; i < currentRow.length; i++) {
        const val = currentRow[i];
        if (val === 1 && !isVisited[i]) {
            DFS2(i, isVisited, matrix);
        }
    }
}

/**
 * 真正完整的遍历一个图的方法在这里！
 * 对于非连通图来说，并不能通过一个节点就遍历完所有的节点的
 * @param {*} graph 图
 */
function traverse(graph) {
    const vertexs = graph.vertexs;
    const isVisited = new Map();
    for (let vertex of vertexs) {
        if (!isVisited.get(vertex)) {
            DFS(vertex, isVisited);
            // 这里可以做一个计算连通分量的个数
            // count++;
        }
    }
}