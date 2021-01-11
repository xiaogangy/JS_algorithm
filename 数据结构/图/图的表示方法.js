/**
 * @file 一直不想写图，感觉算法考到图的可能性太低，就一直没更新，但是前阵子LeetCode连续两天都是并查集的题目，让我不得不重新把图的相关知识整理一下。
 * 一个图是一些顶点的集合，这些顶点通过一系列的边结构连接。顶点用圆圈表示，边就是这些圆圈之间的连线。关于图的一些知识点：
 * - 边可以有权重
 * - 边也可以有方向
 * - 树和链表都是一种特殊的图
 *
 * 图是由顶点和边组成的，那么描述一幅图只需要给定一组顶点，然后告诉哪些顶点相连即可。
 * 图的两种表示方式：
 * - 邻接矩阵：用一个二维矩阵来描述顶点之间的连接情况。矩阵的横轴和纵轴都是顶点，而矩阵中的数值，matrix[i][j]可以描述是否两个顶点相连，
 * 例如0表示不相连，1表示相连。或者有权重的图中，该值可以表示权重。
 * - 邻接表：每个顶点，我们需要保存它和那些顶点连着的信息。例如顶点A，我们把与之相连的顶点用一个链表表示，链表中的节点就都是与A相连的顶点。
 */

/**
 * 链表节点
 * @param {*} val 链表的节点值
 */
function Node(val) {
    this.data = val;
    this.next = null;
}

/**
 * 图的顶点
 * @param {*} data 顶点的值
 */
function Vertex(data) {
    this.data = data;
    // 如果需要连接当前节点与其他节点，只需要在list中添加新的Node即可
    this.list = null;
}

/**
 * 1. 邻接矩阵表示法
 * @param {*} size 顶点的数量
 */
function Graph(size) {
    // 顶点
    this.vertexs = new Array(size).fill(0).map((val, index) => new Vertex(index));
    // 我们重点关注的是图的遍历方式，所以这里图的一些增删改查方法就不实现了
}


function GraphMatrix(size) {
    // 二维矩阵
    this.matrix = new Array(size).fill(0).map(item => new Array(size).fill(0));
    // 连接两个顶点
    this.connect = function (i, j) {
        this.matrix[i][j] = 1;
    }
}


