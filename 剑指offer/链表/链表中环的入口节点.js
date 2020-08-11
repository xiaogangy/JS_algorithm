/**
 * @description 如果一个链表中包含环，如何找出环的入口切点？
 * solution: 这道题在小灰算法中出现过，这里就不做过多的分析了，直接上代码
 */

/**
 * 判断链表是否有环
 * @param {*} head 链表头指针
 */
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
}

/**
 * 如果有环，如何求得环的长度
 * @param {*} head 链表头指针
 */
function cycleLength(head) {
    let first = head;
    let second = head;
    while (second.next !== null && second.next.next !== null) {
        first = first.next;
        second = second.next.next;
        if (first === second) {
            let length = 1;
            let meetingNode = first;
            while (meetingNode.next !== first) {
                meetingNode = meetingNode.next;
                length++;
            }
            return length;
        }
    }
}

/**
 * 求环的入入口节点
 * 这里进行一个简单的分析，比小灰算法更好理解：
 * 假设从起点到入环节点的长度为d，环长为l，那么完整走完一遍的总长度n = d + l;
 * 如果我们现在让一个指针先走l步，再设置第二个指针从起点出发，当他们两个相遇时，指向的节点就是环的入口。为什么呢？
 * 第一个指针先走了l步后，此时剩余的步数就是 n - l = d步，即第一个节点再走d步后刚好走完一圈，也就是刚好走到入口节点。此时第二个指针也走了d步，刚好也会在入口节点，
 * 二者铁定相遇的，这个时候时候就把入口节点确定了。
 *
 * @param {*} head 链表头节点
 */
function entryNodeOfLoop(head) {

    let first = head;
    let second = head;

    // 先求得环长
    const l = cycleLength(head);

    // 让第一个指针先走l步
    for (let i = 0; i < l; i++) {
        first = first.next;
    }
    // 让两个指针都开始出发
    while (first !== second) {
        first = first.next;
        second = second.next;
    }

    return second;
}


/**
 * 完整的代码实现
 * @param {*} head 链表头结点
 */
function solution(head) {
    // 空节点
    if (!head) {
        return null;
    }
    // 1. 判断是不是有环
    let first = head;
    let second = head;
    while (second.next !== null && second.next.next !== null) {
        first = first.next;
        second = second.next.next;

        // 2. 有环的情况下求环长
        if (first === second) {
            let length = 1;
            let meetingNode = first;
            while (meetingNode.next !== first) {
                length++;
                meetingNode = meetingNode.next;
            }

            // 3. 求得环长后找入环节点
            first = head;
            second = head;

            // 让第一个指针先走l步
            for (let i = 0; i < length; i++) {
                first = first.next;
            }
            // 让两个指针都开始出发
            while (first !== second) {
                first = first.next;
                second = second.next;
            }

            return second;
        }
    }
    return null;
}