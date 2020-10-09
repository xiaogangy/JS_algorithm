/**
 * @desc 输入两个链表，找出他们的第一个公共节点。
 *
 * 思路：做这道题的时候，脑子里一定要有个具象的图，也就是说得知道两个链表有公共节点是长什么样的。事实上，如果两个链表如果有公共节点，那么从这个公共节点开始往后，就都是
 * 公共节点了，因此两个链表的样式其实是呈Y型的。
 *
 * solution1: 栈
 * 如思路中的分析，如果两个链表有公共节点，那么这个公共节点一定是位于链表的尾部。如果我们从尾部开始往前找，那么最后一个相同的节点就是我们要找的第一个公共节点。这种逆着
 * 找的思路用栈这种数据结构非常合适。具体做法是：我们使用两个栈，先顺序遍历两个链表，把访问到的节点都放入栈中。然后开始依次从栈中弹出节点，如果两个链表有公共节点，那么
 * 弹出的时候前面的过程肯定是同样的节点。当弹出的节点不一致时，说明分叉了，也就是上一个弹出的节点就是逆序最后一个相同节点。
 * 时间复杂度为O(m+n)，空间复杂度也是o(m+n);
 *
 * solution2: 长度差
 * 上面的方法用了两个栈来保证我们链表可以同时到达终点，如果我们知道了两个链表的长度差，一个先走几步，然后两者再一起出发，是不是也能达到这样的效果呢？具体做法是：
 * - 先遍历两个链表，然后统计得到两个链表的长度A和B，假设A比较长，长度差为D
 * - 我们想让长度为A的链表上的指针，先走D步，然后二者再开始一起走，当二者访问的节点相同时，就是第一个公共节点了
 * 但是要注意一下的是，两个链表是不一定有公共节点的，一定要做好健壮性判断。
 */

/**
 * 找到两个链表的第一个公共节点
 * @param {*} pHead1 第一个链表
 * @param {*} pHead2 第二个链表
 * @return {Object} 返回公共节点
 */
function solution(pHead1, pHead2) {

    // 记得健壮性：有一个为空链表，就直接返回null
    if (!pHead1 || !pHead2) {
        return null;
    }

    // 1. 先求得链表的长，长度差等
    const length1 = getListLength(pHead1);
    const length2 = getListLength(pHead2);
    const d = Math.abs(length1 - length2);
    const longList = length1 > length2 ? pHead1 : pHead2;
    const shortList = longList === pHead1 ? pHead2 : pHead1;

    // 2. 长的先走d步
    let pNodeLong = longList;
    let pNodeShort = shortList;
    for (let i = 0; i < d; i++) {
        pNodeLong = pNodeLong.next;
    }
    // 3. 长链表和短链表此时一起走
    while (pNodeLong && pNodeShort && pNodeLong !== pNodeShort) {
        pNodeLong = pNodeLong.next;
        pNodeShort = pNodeShort.next;
    }

    // 这个值有可能是null，也可能是找到的公共节点。
    return pNodeLong;
}

/**
 * 获取链表的长度
 * @param {*} pHead 链表
 * @return {number} 链表的长度
 */
function getListLength(pHead) {
    let length = 0;
    let pNode = pHead;
    while (pNode) {
        length++;
        pNode = pNode.next;
    }
    return length;
}
