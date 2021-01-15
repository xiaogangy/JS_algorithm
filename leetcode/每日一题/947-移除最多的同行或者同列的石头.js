function createUF(size) {
    let count = size;
    const parent = new Array(size).fill(0).map((i, index) => index);
    const weight = new Array(size).fill(1);

    function find(p) {
        while (p !== parent[p]) {
            parent[p] = parent[parent[p]];
            p = parent[p];
        }
        return p;
    }

    function union(p, q) {
        const rootP = find(p);
        const rootQ = find(q);
        if (rootP === rootQ) {
            return;
        }
        if (weight[rootQ] > weight[rootP]) {
            parent[rootP] = rootQ;
            weight[rootQ] += weight[rootP];
        } else {
            parent[rootQ] = rootP;
            weight[rootP] += weight[rootQ];
        }
        count--;
    }

    function isConnected(p, q) {
        const rootP = find(p);
        const rootQ = find(q);
        return rootP === rootQ;
    }

    function getCount() {
        return count;
    }

    return {
        find,
        union,
        isConnected,
        getCount
    };
}

/**
 * 这道题的难点就在于：并查集中我们都是一维数组，而题目中要联通的是一个二维矩阵，如何才能把二维矩阵映射到一位数组中呢？
 * 假设一个点为[x, y]，那么所有横坐标等于x或者纵坐标等于y的点都应该和这个点连通，最直观的做法就是把x和y连通起来，但是这样也有一个问题
 * 例如[2, 1]和[1, 2]，这两个点其实是不连通的，但是因为横坐标有可能等于纵坐标这种情况的干扰，会认为是连通的。为了排除二者之间相互影响，
 * 一个技巧就是，把横坐标映射到一个纵坐标不可能取到的值，题目的注释中x和y的取值是[0, 10000]，所以可以把横坐标加上10001，这样肯定纵坐标
 * 就取不到了，nice!
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
    const length = stones.length;
    const UF = createUF(20005);
    for (let i = 0; i < length; i++) {
        const [p, q] = stones[i];
        UF.union(p + 10001, q);
    }
    const hashMap = {};
    for (let i = 0; i < length; i++) {
        const [p, q] = stones[i];
        const rootP = UF.find(p + 10001);
        const rootQ = UF.find(q);
        hashMap[rootP] = true;
        hashMap[rootQ] = true;
    }
    return length - Object.keys(hashMap).length;
};