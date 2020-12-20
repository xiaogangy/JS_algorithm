/**
 * @description A星寻路算法，是一种寻找有效路径的算法。
 *
 * 以迷宫游戏为例，我们一般会输入一个起点和一个终点，然后找到一条最短路径从起点到终点。这里我们把迷宫抽象成一个二维矩阵，矩阵中的每一个点表示当前在矩阵中的一个位置。
 * 在解决问题前，先引入两个集合一个公式:
 * - openList: 可到达的格子，列表
 * - closeList: 已到达的格子，列表
 * F = G + H;
 * G: 从起点走到当前格子的成本，即步数；
 * H：在不考虑障碍物的情况下，从当前格子走到目标格子的距离，也就是距离目标还有多远
 * F：G和H的综合评估，总步数
 *
 * 举个例子，起点为Grid(2, 1)，终点为Grid(2, 5)：
 * 1. 初始时，先把起点放到openList
 * 2. 找出openList中F值最小的Grid，然后把它移出openList，放到closeList，表示该节点已经被访问过了。
 * 3. 找出当前格子的上下左右（邻居）节点，看他们是否在openList或closeList中，如果都不在，就把他们加入openList中，并计算相应的G、H、F值，并把当前格子记为他们的父节点
 * 后续的操作，不断循环2、3步骤，注意以下几点：
 * - 在搜寻一个格子的相邻节点时，如果发现它们是障碍物，就忽略这些节点，不把他们放入到openList中
 * - 终止条件？持续的循环，直到终点节点进入到openList，这时候之前的父节点就要起作用了，沿着父节点，一直往前找，就找到一条有效路径
 *
 * 可能说的不是很清楚，如果实在模糊，可以看看小灰算法……
 * @date 本质上来讲，就是一个广度优先遍历，只不过加了一点优化
 */


// 迷宫二维矩阵
// 注意这个矩阵，为了方便抽象，纵轴为x轴，符合数组的读取习惯
const MAZE = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

// 先声明一下Grid的结构吧，写成一个类得了，拥抱JAVA
class Grid {
    constructor(x, y) {
        this.x = x; // 横坐标
        this.y = y; // 纵坐标
        this.G = 0;
        this.H = 0;
        this.F = 0;
        this.parent = null; // 父节点
    }

    // 主要负责初始化G、H、F等值，还有parent
    initGrid(parent, end) {
        this.parent = parent;
        // parent传null，表示是起始节点初始化
        if (parent) {
            this.G = parent.G + 1;
        } else {
            this.G = 0;
        }
        this.H = Math.abs(this.x - end.x) + Math.abs(this.y - end.y);
        this.F = this.G + this.H;
    }
}

function aStarSearch(start, end) {

    // 先写几个有用的工具函数吧
    // 找到当前openList中最小的节点
    function findMiniGrid(openList) {
        let tempGrid = openList[0];
        for (let i = 1; i < openList.length; i++) {
            const current = openList[i];
            if (current.F < tempGrid.F) {
                tempGrid = current;
            }
        }
        return tempGrid;
    }

    // 判断一个格子是不是合法的
    function isValidGrid(x, y, openList, closeList) {
        // 是否超过边界
        if (x < 0 || y < 0 || x >= MAZE.length || y >= MAZE[0].length) {
            return false;
        }
        // 是否是障碍物
        if (MAZE[x][y] === 1) {
            return false;
        }
        // 是否在openList或closeList中
        if (isContainCertainGrid(openList, x, y) || isContainCertainGrid(closeList, x, y)) {
            return false;
        }
        return true;
    }

    // 判断list中是否包含某个格子
    function isContainCertainGrid(list, x, y) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].x === x && list[i].y === y) {
                return true;
            }
        }
        return false;
    }

    // 寻找邻居节点
    function findNeighbours(grid, openList, closeList) {
        const gridList = [];
        // 上
        if (isValidGrid(grid.x - 1, grid.y, openList, closeList)) {
            gridList.push(new Grid(grid.x - 1, grid.y));
        }
        // 下
        if (isValidGrid(grid.x + 1, grid.y, openList, closeList)) {
            gridList.push(new Grid(grid.x + 1, grid.y));
        }
        // 左
        if (isValidGrid(grid.x, grid.y - 1, openList, closeList)) {
            gridList.push(new Grid(grid.x, grid.y - 1));
        }
        // 右
        if (isValidGrid(grid.x, grid.y + 1, openList, closeList)) {
            gridList.push(new Grid(grid.x, grid.y + 1));
        }
        return gridList;
    }

    // 步入正文：！！！
    let openList = [];
    let closeList = [];
    // 把起点加入openList
    openList.push(start);
    // 主循环，每一轮检查一个当前节点
    while (openList.length > 0) {
        // 1. 找到当前openList中的最小值
        let currentGrid = findMiniGrid(openList);

        // 2. 将当前节点移除，放到closeList
        openList = openList.filter(item => item.x !== currentGrid.x && item.y !== currentGrid.y);
        closeList.push(currentGrid);

        // 3. 找到所有相邻节点
        const neighbours = findNeighbours(currentGrid, openList, closeList);
        for (let i in neighbours) {
            // 初始化grid
            const grid = neighbours[i];
            grid.initGrid(currentGrid, end);
            openList.push(grid);
        }

        // 4. 如果终点出现在openList中，直接返回终点格子
        // 这一步其实可以放到步骤3中，但是为了逻辑分开理解的清楚一些，就先放到这儿吧
        for (let i in openList) {
            const grid = openList[i];
            if (grid.x === end.x && grid.y === end.y) {
                return grid;
            }
        }
    }

    // openList都访问问了，还是没到终点，说明终点不可到达，返回空值即可
    return null;
}

function testFunc() {
    const startGrid = new Grid(2, 1);
    const endGrid = new Grid(2, 5);

    let resultGrid = aStarSearch(startGrid, endGrid);
    const copy = JSON.parse(JSON.stringify(MAZE));
    // 回溯迷宫路径
    while (resultGrid.parent) {
        const x = resultGrid.x;
        const y = resultGrid.y;
        copy[x][y] = '-';
        console.log(`[${x}, ${y}]`);
        resultGrid = resultGrid.parent;
    }
    copy.forEach(element => {
       console.log(JSON.stringify(element));
    });
}

testFunc();