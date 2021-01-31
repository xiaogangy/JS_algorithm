/**
 * @file 神奇的并查集
 */

/**
 * 创建一个并查集
 * @param {@} n 并查集的大小
 */
function createUF(n) {
    // 连通分量个数
    let count = n;
    // 表示每个点存储的父节点(一开始都指向自己)
    const parent = new Array(n).fill(1).map((val, index) => index);
    // 表示以当前节点为根节点的树的节点个数
    const size = new Array(n).fill(1);

    // 找到节点p的根节点
    // const find = function (p) {
    //     // 根节点的parent[p] === p
    //     while (parent[p] !== p) {
    //         p = parent[p];
    //     }
    //     return p;
    // };

    // 优化版
    const find = function (p) {
        // 根节点的parent[p] === p
        while (parent[p] !== p) {
            // 压缩路径：直接让当前节点的父节点变为原父节点的父节点
            const tempParent = parent[p];
            const tempP = p;
            parent[p] = parent[parent[p]];
            p = parent[p];
            // size感觉还是要变一下(仅当变完还没到root时)
            if (parent[p] !== p) {
                size[tempParent] = size[tempParent] - size[tempP];
            }
        }
        return p;
    };

    // 连接两个节点
    // const union = function (p, q) {
    //     const rootP = find(p);
    //     const rootQ = find(q);
    //     // 二者已经连通了
    //     if (rootP === rootQ) {
    //         return;
    //     }
    //     // 二者没有连通：让p的根节点指向q的根节点
    //     parent[rootP] = rootQ;
    //     count--;
    // };

    // 优化版union函数
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

    return {union, isConnected, getCount};
}

