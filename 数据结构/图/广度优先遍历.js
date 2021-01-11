/**
 * @file 广度优先遍历（图）
 * @desc 广度优先遍历的思想是，先广撒网，把靠近自己的都访问完，再按照顺序访问比自己稍微远一点的节点。
 */

/**
 * 广度优先遍历（邻接表）
 * @param {*} root 出发的节点
 * @param {*} isVisited 记录访问过的节点
 */
function BFS(root, isVisited) {
    if (!root) {
        return;
    }
    // BFS需要队列
    const queue = [root];
    while (queue.length) {
        const first = queue.shift();
        console.log(first.data);
        isVisited.set(first, true);

        // 遍历弹出节点的所有相邻元素，然后放到队列中
        let node = first.list;
        while (node) {
            if (isVisited.get(node) !== true) {
                queue.push(node);
            }
            node = node.next;
        }
    }
}

/**
 * 广度优先遍历-邻接矩阵版
 * 同于DFS，这里我们还是默认节点就是一些整数值
 * @param {*} start 起点
 * @param {*} isVisited 记录访问过的节点
 * @param {*} matrix 二维矩阵
 */
function BFS2(start, isVisited, matrix) {
    const queue = [start];
    while (queue.length) {
        const first = queue.shift();
        console.log(first);
        isVisited[first] = true;

        const row = matrix[start];
        for (let i = 0; i < row.length; i++) {
            if (isVisited[i] !== true && matrix[i] === 1) {
                queue.push(i);
            }
        }
    }
}

/**
 * 同理，对于非连通图，我们需要从多个节点出发才能访问到所有节点
 * @param {*} graph 图
 */
function traverse(graph) {
    const vertexs = graph.vertexs;
    const isVisited = new Map();
    for (let vertex of vertexs) {
        if (!isVisited.get(vertex)) {
            BFS(vertex, isVisited);
            // 这里可以做一个计算连通分量的个数
            // count++;
        }
    }
}