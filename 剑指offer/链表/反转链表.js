/**
 * @desc 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头结点。
 *
 * solution：反转链表不是一个难的操作，但是要注意防止在反转的过程中链表断裂的情况，即某个节点指向了它的前一个节点，然后无法访问它的下一个节点了。
 * 因此我们需要保存3个节点，当前修改节点，它的前一个节点，它的后一个节点。同时为了验证各种极端情况，我们需要提前想好测试用例，对我们写出来的代码进行鲁棒性测试。
 *
 * 同样的，做链表的题目，还是要考虑头指针、单节点、尾节点等特殊情况
 */

/**
 * 反转链表
 * @param {*} head 链表头结点
 * @return {Object} 新头结点
 */
function reverseLinkedList(head) {
    // 空链表
    if (!head) {
        return null;
    }

    let pre = null;
    let current = head;
    while (current) {
        // 先保存下一个节点，防止链表断裂
        const next = current.next;
        // 反转
        current.next = pre;
        // 更新追踪节点
        pre = current;
        current = next;
    }

    return pre;
}

// 递归版
function recursiveReverse(head) {
    // 健壮性 && 递归出口
    if (!head.next) {
        return head;
    }

    // 链表本身就是一个递归结构，先对链表的后半部分进行反转
    const newHead = recursiveReverse(head.next);
    // 考虑反转完的结构：返回了链表后半段反转结果的头节点，此时要把当前的头结点和后面链表的尾结点连接起来
    // 此时head节点的next指针仍指向现在已作为后半段链表尾结点的节点
    head.next.next = head;
    head.next = null;

    return newHead;
}

function Node(val) {
    this.val = val;
    this.next = null;
}

function testFunc() {
    const node1 = new Node(1);
    const node2 = new Node(2);
    const node3 = new Node(3);
    const node4 = new Node(4);
    const node5 = new Node(5);
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    console.log(reverseLinkedList(node1));
    console.log(recursiveReverse(node1));
}
testFunc();