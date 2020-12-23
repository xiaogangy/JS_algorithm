/**
 * @desc 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。
 * 如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径。
 * a b t g
 * c f c s
 * j d e h
 *
 * 考点：深度优先遍历(DFS) 回溯
 * 思路：这是一道典型的回溯法题目。我们在矩阵中任选一个格子作为起点出发，判断这个格子的值是不是符合string字符上第i位的元素，如果是，则访问它相邻的四个节点，继续进行类似的操作。
 * 如果当前格子的值与string上第i位的元素不同，说明这条路径行不通，需要返回到上一个节点，尝试上一个节点的其他可走的节点。
 * 由于矩阵的格子不能重复进入某条路径，所以还需要定义和字符矩阵大小一样的布尔值矩阵，用来标识某个格子已经在当前路径中了。
 *
 */

/**
 * 矩阵中是否可以找到一条指定的路径
 * @param {Array} matrix 矩阵
 * @param {string} target 要找的字符串
 * @return {boolean} 是否找到路径
 */
function hasPath(matrix, target) {

    // 1. 先声明一个和matrix同等大小的布尔矩阵，用来标识是否已经访问过该节点
    // 这个值只表示在一次探索中某个节点是否被访问到，某次探索失败后，要把这个访问过的节点重新标识为未访问过
    const rows = matrix.length;
    const columns = matrix[0].length;
    const isVisitedArray = new Array(rows).fill(0).map(item => new Array(columns).fill(false));

    // 2. 从矩阵中的左上角出发，依次判断其作为一个起点，是否能找到符合题目的路径
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // 核心函数，判断从该格子出发，能否找到一条符合的路径
            if (hasPathCore(i, j, target, matrix, isVisitedArray, rows, columns)) {
                return true;
            }
        }
    }
    // for循环执行完都没退出，则肯定是没找到，直接返回false
    return false;

}

/**
 * 对从一个节点出发，寻找有效路径的抽象。
 * 下面这些参数里，在每一轮递归里变化的参数实际上只有x,y,isVisitedArray这几个变量，其他的都是辅助作用
 * @param {*} x 当前起点的横坐标
 * @param {*} y 当前起点的纵坐标
 * @param {*} str 待寻找的字符串
 * @param {*} matrix 二维矩阵
 * @param {*} isVisitedArray 保存当前节点是否已经被访问过
 * @param {*} rows 二维矩阵的行数
 * @param {*} columns 二维矩阵的列数
 * @return {boolean} 是否找到了一条路径
 */
function hasPathCore(x, y, str, matrix, isVisitedArray, rows, columns) {
    // 这里简单分析一下这道题的递归
    // 其中总共就三种情况：
    // 1. 要找到字符串是个空串，显然我们认定为可以找到；
    // 2. 判断当前位置的值和要找字符串的第一个值是不是一样，一样的话，去判断它的相邻4个节点。
    // 3. 如果不一样，则直接说明这条路径行不通，返回false
    let hasFound = false;

    // 递归终止条件
    if (str.length === 0) {
        return true;
    }
    // 要确保这个节点的索引是可访问的
    if (x >= 0 && x < rows && y >= 0 && y < columns && matrix[x][y] === str[0] && !isVisitedArray[x][y]) {
        // 表示当前这个节点已经在访问过的路径上了，下一次递归不应该再访问
        isVisitedArray[x][y] = true;
        // 递归的去判断，从相邻节点出发，是否能找到符合要求的子串
        // 上
        const topHasPath = hasPathCore(x - 1, y, str.slice(1), matrix, isVisitedArray, rows, columns);
        // 下
        const bottomHasPath = hasPathCore(x + 1, y, str.slice(1), matrix, isVisitedArray, rows, columns);
        // 左
        const leftHasPath = hasPathCore(x, y - 1, str.slice(1), matrix, isVisitedArray, rows, columns);
        // 右
        const rightHasPath = hasPathCore(x, y + 1, str.slice(1), matrix, isVisitedArray, rows, columns);

        // 从当前节点出发是否可以找到一条有效路径呢？
        hasFound = topHasPath || bottomHasPath || leftHasPath || rightHasPath;

        // 把这个节点是否访问过重置为false，这是为了保证当前节点作为另外一条路径上的节点被访问到时，仍然是可访问的
        isVisitedArray[x][y] = false;
    }

    return hasFound;
}

function test() {
    const array = [['C', 'A', 'A'], ['A', 'A', 'A'], ['B', 'C', 'D']];
    const target = 'AAB';
    console.log('find?', hasPath(array, target));
}

test();