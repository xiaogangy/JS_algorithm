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
 * 获取只能交换指定位置的 字典序最小的字符串
 *
 * @param {string} s 原始字符串
 * @param {Array} pairs 索引数组对
 * @return {string} 字典序最小的字符串
 */
var smallestStringWithSwaps = function (s, pairs) {
    if (!s || !pairs) {
        return '';
    }
    const hashMap = {};
    const indexMap = {};
    const UF = createUF(s.length);
    // 先把所有节点都连起来
    for (let i = 0; i < pairs.length; i++) {
        const [x, y] = pairs[i];
        UF.union(x, y);
    }

    // 遍历字符串，把连通分量都放到一起
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const root = UF.find(letter);
        if (!hashMap[root]) {
            hashMap[root] = [];
            indexMap[root] = [];
        }
        hashMap[root].push(letter);
        indexMap[root].push(i);
    }

    const result = new Array(s.length).fill(0);
    Object.keys(hashMap).forEach(key => {
        const array = hashMap[key];
        const indexes = indexMap[key];
        array.sort((a, b) => (a.charCodeAt() - b.charCodeAt()));
        indexes.sort((a, b) => a - b);
        array.forEach((item, index) => {
            const rightIndex = indexes[index];
            result[rightIndex] = item;
        });
    });

    return result.join('');
};

function test() {
    var s = 'dcab';
    var pairs = [
        [0, 3],
        [1, 2]
    ];
    console.log(smallestStringWithSwaps(s, pairs));
}

test();