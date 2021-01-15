/**
 * 创建一个并查集
 * @param {@} n 并查集的大小
 */
function createUF(n) {
    // 连通分量个数
    let count = n;
    // 表示每个点存储的父节点(一开始都指向自己)
    const parent = new Array(n).fill(0).map((val, index) => index);
    // 表示以当前节点为根节点的树的节点个数
    const size = new Array(n).fill(1);

    // 找到节点p的根节点
    const find = function (p) {
        // 根节点的parent[p] === p
        while (parent[p] !== p) {
            // 压缩路径：直接让当前节点的父节点变为原父节点的父节点
            parent[p] = parent[parent[p]];
            p = parent[p];
        }
        return p;
    };

    // 连接两个节点
    const union = function (p, q) {
        const rootP = find(p);
        const sizeP = size[p];
        const rootQ = find(q);
        const sizeQ = size[q];
        // 二者已经连通了
        if (rootP === rootQ) {
            return;
        }

        // 不再是无脑改变节点指向，而是让子节点少的指向子节点多的
        if (sizeP > sizeQ) {
            parent[rootQ] = rootP;
            // 注意更新子节点数量
            size[rootP] += size[rootQ];
        } else {
            parent[rootP] = rootQ;
            size[rootQ] += size[rootP];
        }
        count--;
    };

    // 判断两个节点是否连通
    const isConnected = function (p, q) {
        const rootP = find(p);
        const rootQ = find(q);
        return rootP === rootQ;
    };

    const getCount = function () {
        return count;
    };

    return {union, isConnected, getCount, find};
}
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    if (!edges || !edges.length) {
        return [];
    }
    const result = [];
    const size = edges.length * 2;
    const UF = createUF(size);
    for (let i = 0; i < edges.length; i++) {
        const current = edges[i];
        const [x, y] = current;
        if (UF.isConnected(x, y)) {
            result.push(current);
        } else {
            UF.union(x, y);
        }
    }
    return result[result.length - 1];
};
