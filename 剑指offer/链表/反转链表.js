/**
 * @desc 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头结点。
 *
 * solution：反转链表不是一个难的操作，但是要注意防止在反转的过程中链表断裂的情况，即某个节点指向了它的前一个节点，然后无法访问它的下一个节点了。
 * 因此我们需要保存3个节点，当前修改节点，它的前一个节点，它的后一个节点。同时为了验证各种极端情况，我们需要提前想好测试用例，对我们写出来的代码进行鲁棒性测试。
 */

/**
 * 反转链表
 * @param {*} head 链表头结点
 */
function reverseLinkedList(head) {

    let pre = null;
    let current = head;
    // 空链表
    if (!current) {
        return null;
    }
    let next = current.next;
    // 单节点链表
    if (!next) {
        return head;
    }

    // 遍历链表，进行反转
    while (current) {
        // 反转当前链表
        current.next = pre;
        // 更新各个追踪节点
        pre = current;
        current = next;
        // 要考虑最后一个节点的情况
        next = current && current.next;
    }
    return pre;

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
}
testFunc();