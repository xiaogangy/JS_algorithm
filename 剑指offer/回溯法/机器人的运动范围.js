/**
 * @description 地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
 *
 * 思路：这道题也是一道回溯的经典例题。为什么可以用回溯呢？机器人可以从一个格子出发，如果当前这个这个可以访问，就去访问它的相邻格子(上下左右)，如果某个格子不能访问，就返回上一个格子，
 * 访问相邻的其他格子；如果某个相邻格子可以访问的话，那么就可以把这个格子作为一个新的起点，继续去访问它的相邻格子。这样的话，其实就是一直在解决同样的问题，只不过是问题规模发生了变化。
 * 所以这道题，可以用递归来解决。
 */

function movingCount(threshold, rows, columns) {

    // 1. 先声明一个同等大小的二维矩阵，用来存储每个格子是否已经被访问过，访问过的因为已经参与了计数，就不用再加一了
    const isVisitedArray = new Array(rows).fill(0).map(item => new Array(columns).fill(false));
    // 2. 用递归函数计算总共可以访问的格子数之和
    const count = movingCountCore(0, 0, rows, columns, isVisitedArray, threshold);
    // 第二种写法
    const result = {number: 0};
    const isVisited = new Array(rows).fill(0).map(item => new Array(columns).fill(false));
    const count_2 = movingCountCore_2(0, 0, rows, columns, isVisited, threshold, result)

    return {count, count_2: result.number};

}

/**
 * 表示从（x, y）出发，可以到达的格子的和
 *
 * @param {*} x 当前格子的横坐标
 * @param {*} y 当前格子的纵坐标
 * @param {*} rows 棋盘的行数
 * @param {*} columns 棋盘的列数
 * @param {*} isVisitedArray 格子是否被访问过的数组
 * @param {*} threshold k值
 * @return {number} 返回数量
 */
function movingCountCore(x, y, rows, columns, isVisitedArray, threshold) {

    // 来解释一下这个递归，这个递归的终止条件就是当发现一个点不可访问，就结束了。如果可以访问，那么就进入子递归，并在之前的count上加1
    let count = 0;

    if (checkIsValid(x, y, rows, columns, isVisitedArray, threshold)) {
        isVisitedArray[x][y] = true;
        count = 1 + movingCountCore(x - 1, y, rows, columns, isVisitedArray, threshold)
            + movingCountCore(x + 1, y, rows, columns, isVisitedArray, threshold)
            + movingCountCore(x, y - 1, rows, columns, isVisitedArray, threshold)
            + movingCountCore(x, y + 1, rows, columns, isVisitedArray, threshold);
    }

    return count;

}

// 回看这道题的解法，感觉写的不那么的“典型回溯”，回溯是要让自己站在选择的路口上，自己去尝试，尝试完一种选择后，就换另外一种选择
// 充分记住，回溯的两个关键点：已经做出的选择 + 可以进行的选择
function movingCountCore_2(x, y, rows, columns, isVisited, threshold, count) {
    const isValid = checkIsValid(x, y, rows, columns, isVisited, threshold);
    if (isValid) {
        // 先把当前这次的选择要做的事情做了，每次发现当前节点可进入的时候，就把count的值更新
        // 这也是这个回溯和上面写法的不同，这种写法是我带着所有的状态不停的游历各种选择
        isVisited[x][y] = true;
        count.number++;
        // 面临四种选择：上下左右
        movingCountCore_2(x - 1, y, rows, columns, isVisited, threshold, count);
        movingCountCore_2(x + 1, y, rows, columns, isVisited, threshold, count);
        movingCountCore_2(x, y - 1, rows, columns, isVisited, threshold, count);
        movingCountCore_2(x, y + 1, rows, columns, isVisited, threshold, count);
    }
}

// 判断当前格子是否可访问
function checkIsValid(x, y, rows, columns, isVisitedArray, threshold) {
    if (x >= 0 && x < rows && y >= 0 && y < columns && !isVisitedArray[x][y] && (getDigitSum(x) + getDigitSum(y)) <= threshold) {
        return true;
    }
    return false;
}

// 计算各位数的和
function getDigitSum(number) {
    const tempArray = String(number).split('').map(digit => parseInt(digit, 10));
    return tempArray.reduce((a, b) => a + b);
}

console.log(movingCount(18, 100, 100));