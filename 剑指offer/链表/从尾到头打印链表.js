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