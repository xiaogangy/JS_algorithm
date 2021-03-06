/**
 * @file 如何判断一个链表中是否有环？
 */

// 链表节点
function Node(data) {
    this.data = data;
    this.next = null;
}

// 解法1：暴力求解法
// 每遍历到一个元素，就从链表的源头再开始进行另外一次测试遍历，查看这次测试遍历中是否有与当前访问节点相同的节点，如果有，那么就是有环
// 这种方法就不实现了

// 解法2：哈希表（JS对象）
// 每访问一个节点，就将这个节点的值保存到对象中，然后遍历下一个节点的时候，判断这个哈希表中有没有这个等值的key

// 经典解法：追及问题
// 考虑两个在操场跑步的人A和B，如果B的倍速是A的2倍，两个人从起点开始跑步，那么B肯定会再次追上A，第一次追上时差值最小，差值为一圈。也就是两人会在跑道起点再次相遇
// 借助这个思路，设置两个指针，一个走2步，一个走1步，如果二者会相遇，那么肯定是有环的
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
}

/**
 * 引申1：如果有环，如何判断环的长度？
 * 思路：如果有环，让他俩从第一次相遇开始，继续走，下一次相遇的时候，B比A刚好多走了一圈，这就是环的长度。那么这个长度等于多少呢？因为A每次走一步，可以统计A的前进次数，就是环的长度。
 */
// 参数为第一次相遇的节点，即继续开始走的起点
function cycleLength(start) {
    // 记录A走的步数
    let length = 0;
    let slow = start;
    let fast = start;
    while (fast !== null && fast.next !== null) {
        length++;
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return length;
        }
    }
}


/**
 * 引申2：如果有环，如何判断环的起点（入环起点）？
 * 思路：假设A和B在入环S1距离的地方相遇，从S1到入环点的距离为S2，从起点开始到入环点的距离为D，那么从上文可以得出以下公式
 * 2 * (D + S1) = D + n * (S1+S2) + S1，通过变形可以得到 D = (n-1)*(S1+S2) + S2， 其中n表示B在环内走了n圈后与A相遇
 * 这个公式说明了什么呢？如果让在二者相遇处和链表起点分别放一个指针，两个指针每次都只前进一步，那么当他们相遇时候的位置，就是入环切点。
 * 这里难理解的地方是，一开始我总认为n是一个变量，是一个不确定的值，但是其实n是一个定值，可以假定它为任何一个值，那么上述公式在A和B相遇时
 * 仍然是成立的，那么公式右边的意思是，绕了n圈（此时仍在原来的位置），然后继续前进了S2步，这就刚好是我们一开始设定的到达入环节点的距离；
 * 2020-10-02: 再一次看这个公式，发现有个更好理解的方向。D = (n-1)*(S1+S2) + S2，我们不必关心n具体等于多少，这个公式告诉我们，从相遇
 * 位置放一个点，从起点放一个点，二者保持一样的速度，总会相遇的。比如说，D很长，S2很短，肯定环内的点走完一圈，D上的点还没到入环口，但是我们不用
 * 担心，就让他们继续走就完了，走个(n - 1)圈肯定会相遇的，这个n等于多少我们并不关心，但是一定会相遇！相遇的点就是入环点。
 */
/**
 * 
 * @param {Object} node 相遇的节点
 * @param {Object} head 头结点
 */
function startPoint(node, head) {
    // 相遇位置设置一个指针
    let circleNode = node;
    // 起点放置一个指针
    let startNode = head;
    // 只要二者没相遇，就让他们同时每次走一步
    while (circleNode !== startNode) {
        circleNode = circleNode.next;
        startNode = startNode.next;
    }
    return circleNode;
}


function test() {
    const node1 = new Node(5);
    const node2 = new Node(3);
    const node3 = new Node(7);
    const node4 = new Node(2);
    const node5 = new Node(6);
    const node6 = new Node(8);
    const node7 = new Node(1);
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    node5.next = node6;
    node6.next = node7;
    node7.next = node4;

    // 判断是否有环
    console.log('有环？', hasCycle(node1));
    // 环的长度
    console.log('环长？', cycleLength(node1));
    // 环的入点
    console.log('入点', startPoint(node1, node5));
}

test();