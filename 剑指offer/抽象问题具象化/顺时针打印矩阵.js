/**
 * @description 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 *
 * 思路：这道题不涉及复杂的数据结构和算法，但是要想得到完整的case通过率，要注意分析各种特殊的情况。当我们遇到一个复杂问题的时候，可以
 * 用图形来思考。由于是以从外圈到内圈的顺序依次打印的，所以我们可以把矩形想象成若干个圈，我们可以用循环来打印每个圈。
 * 这里思考几个问题：
 * 1. 循环的判断条件什么，或者说循环的终止条件是什么？
 * 我们每次打印一个环都是从左上节点开始的，这个节点的横纵坐标都是一样的，我们把index值成为start，分析可得到当2 * start < rows && 2 * start < columns的时候，这个圈是还没被打印过的。
 * 2. 打印一个环的时候，有没有什么要注意的情况？
 * 我们把打印一个环的步骤分为从左到右，从上倒下，从右到左，从下到上四个步骤。当然不用这么具象化也可以，但是具象化后显然更好分析，写起代码来也更快。
 * 第一步总是要进行的，即从左到右输出一行，没有特殊情况！
 * 第二步呢？第二步要求当前环的rows要至少为2
 * 第三步呢？要求当前环的columns至少也为2，当然rows还是至少为2
 * 第四步呢？要求当前环的rows至少为3，columns至少为2就行了
 * 以上每一步，都是进行后一步的充分条件，也就是如果一步被pass了，后面的肯定都不进行了。
 */

function printMatrixClockwisely(matrix) {
    // 空值或者空矩阵，直接返回
    if (!matrix || !matrix.length || !matrix[0]) {
        return;
    }
    // 矩阵的行数和列数
    let rows = matrix.length;
    let columns = matrix[0].length;
    let start = 0;
    const result = [];
    while (start * 2 < rows && start * 2 < columns) {
        printMatrixInCircle(matrix, rows, columns, start, result);
        start++;
    }
    return result;
}

/**
 * 打印二维矩阵的一圈
 * @param {*} matrix 待打印的二维矩阵
 * @param {*} rows 行数
 * @param {*} columns 列数
 * @param {*} start 当前一圈的起点值
 * @param {*} result 待打印的节点值
 */
function printMatrixInCircle(matrix, rows, columns, start, result) {
    // 按照如上分析依次进行打印（或者我们放到数组里也行）
    let endX = rows - 1 - start;
    let endY = columns - 1 - start;
    // 1. 打印从左到右
    for (let i = start; i <= endY; i++) {
        // console.log(matrix[start][i]);
        result.push(matrix[start][i]);
    }
    // 2. 从上到下打印
    if (start < endX) {
        for (let j = start + 1; j <= endX; j++) {
            // console.log(matrix[j][endY]);
            result.push(matrix[j][endY]);
        }
    }
    // 3. 从左到右打印
    if (start < endX && start < endY) {
        for (let m = endY - 1; m >= start; m--) {
            // console.log(matrix[endX][m]);
            result.push(matrix[endX][m]);
        }
    }
    // 4. 从下到上打印
    if (start < endY && start < endX - 1) {
        for (let n = endX - 1; n > start; n--) {
            // console.log(matrix[n][start]);
            result.push(matrix[n][start]);
        }
    }
}

function testFunc() {
    const arr = [[1]];
    console.log(printMatrixClockwisely(arr));
}

testFunc();