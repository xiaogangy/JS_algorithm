/**
 * @description 输入一个链表，按链表从尾到头的顺序返回一个array
 *
 * solution: 正常输出链表都是从头到尾，想要从尾到头，则这是一个先进后出的逻辑操作，可以用栈来实现
 */

function ListNode(x) {
    this.val = x;
    this.next = null;
}

function solution(head) {
    let current = head;
    let array = [];
    while (current) {
        array.push(current.val);
        current = current.next;
    }
    return array.reverse();
}

/**
 * 或者使用递归的思想来做，先输出头节点后面的所有节点，再输出头结点
 * @param {*} head 头节点
 */
function recursiveOutput(head) {
    if (!head) {
        return;
    }
    recursiveOutput(head.next);
    console.log(head.val);
}

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
console.log(solution(node1));
console.log(recursiveOutput(node1));