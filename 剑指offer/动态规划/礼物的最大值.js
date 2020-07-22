/**
 * @desc 在一个m*n的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于0）。你可以从棋盘的左上角开始拿格子里的礼物，
 * 并每次向左或者向下移动一格，指导到达棋盘的右下角。给定一个棋盘及其上面的礼物，请计算你最多能拿到多少价值的礼物？
 * 例如，在下面的棋盘中，如果沿着带*的数字的线路（1、12、5、7、7、16、5），那么我们能拿到最大价值为53的礼物。
 * 1*  10  3    8
 * 12* 2   9    6
 * 5*  7*  4   11
 * 3   7*  16*  5*
 *
 * 思路：这是一道典型的动态规划的题目，我们来看看是否满足了动态规划的几个特点：
 * - 求最值问题，求最优解
 * - 大问题可以分解为小问题，且小问题也有最优解，只是规模上不一样
 * - 小问题的最优解组合起来能得到大问题的最优解
 * 接下来我们看看这道题的题解，定义f(i, j)为达到格子(i, j)时所能得到的礼物的最大值，我们知道到达格子(i, j)只能从左边(i-1, j)或者上边(i, j-1)达到，
 * 所以我们可以得到递推公式：f(i, j) = max(f(i-1, j), f(i, j-1)) + g(i, j); 其中g(i, j)表示坐标为(i, j)的格子里的礼物。
 * 从这个公式我们可以看到最后要的结果是f(rows, columns)的值，所以我们如果用DP求解，需要从f(0, 0)开始算起，而且因为是自底向上求解，我们需要维护一个
 * 和棋盘大小一样的二维矩阵，用来保存到达每个格点时候所能获得的礼物的最大值。
 *
 */

/**
 * solution1：二维矩阵保存前面的计算结果
 * @param {*} values 棋盘矩阵
 * @return {number} max 礼物的最大价值
 */
function solution1(values) {
    const rows = values.length;
    const columns = values[0].length;
    // 如果行或者列没有值，直接返回0
    if (!rows || !columns) {
        return 0;
    }

    // 步入正题
    // 声明二维矩阵，保存子问题的解
    const matrix = new Array(rows).fill(0).map(i => []);
    // 遍历二维矩阵，填写每个位置的值
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let top = 0;
            let left = 0;
            // top value
            if (i > 0) {
                top = matrix[i - 1][j];
            }
            if (j > 0) {
                left = matrix[i][j - 1];
            }
            const value = Math.max(top, left) + values[i][j];
            matrix[i][j] = value;
        }
    }

    return matrix[rows - 1][columns - 1];
}

/**
 * solution2：在前面的计算中，我们看到每次计算一个新的值，实际上只用到了左边和上边的值，在小灰算法中，我们做过类似对二维矩阵的空间优化。
 * 我们不再用二维矩阵保存之前子问题的解，而只是用一个一维数组表示。我们每一次求解都会刷新这个一维数组，当我们求解到matrix[j]时，左边的
 * 值表示求得的当前行的值，也就是之前的matrix[i][0~j-1]，右边的是matrix[i-1][j-1~end]，也就是说我们更新这个一维数组的时候，是从左往右
 * 更新的，这样左边的值都是最新值，右边的值表示上一行同一列的值。
 *
 * @param {*} values 棋盘矩阵
 * @return {number} max 礼物的最大价值
 */
function solution2(values) {
    const rows = values.length;
    const columns = values[0].length;
    // 如果行或者列没有值，直接返回0
    if (!rows || !columns) {
        return 0;
    }

    // 步入正题
    // 声明一维数组，保存子问题的解
    const matrix = new Array(columns);
    // 虽然是一维数组保存子问题，还是要遍历values这个二维矩阵
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let top = 0;
            let left = 0;
            // top value
            if (i > 0) {
                top = matrix[j];
            }
            if (j > 0) {
                left = matrix[j - 1];
            }
            const value = Math.max(top, left) + values[i][j];
            matrix[j] = value;
        }
    }

    return matrix[columns - 1];
}

function testFunc() {
    const values = [
        [1, 10, 3, 8],
        [12, 2, 9, 6],
        [5, 7, 4, 11],
        [3, 7, 16, 5]
    ];
    console.log(solution2(values));
}
testFunc();