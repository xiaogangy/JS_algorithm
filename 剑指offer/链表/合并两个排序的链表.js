/**
 * @description 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
 * 例如链表1为1 -> 3 -> 5 -> 7，链表2为2 -> 4 -> 6 -> 8，合并之后为1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
 *
 * 思路：在归并排序中，我们用到的基础思想就是合并两个有序的数组，方法是不断的比较数组的第一个元素，然后插入到第三个数组中。这里链表的合并也采用类似的思想，
 * 不断的比较两个链表的头结点，把小的元素放入到新的链表中，直到一个链表为空了，这时候把剩余的那个链表直接接在第三个链表的尾部。
 * 但是！我们会发现，移除某个链表的头结点后，仍然是合并两个有序链表，这时候我们发现可以使用递归来解决问题。
 */

/**
 * 合并两个有序链表
 * @param {*} pHead1 链表1
 * @param {*} pHead2 链表2
 */
function merge(pHead1, pHead2) {
    // 如果某个链表是空的，合并结果直接是另外一个链表
    if (pHead1 === null) {
        return pHead2;
    } else if (pHead2 === null) {
        return pHead1;
    }

    let pMergeHead = null;
    if (pHead1.val <= pHead2.val) {
        pMergeHead = pHead1;
        pMergeHead.next = merge(pHead1.next, pHead2);
    } else {
        pMergeHead = pHead2;
        pMergeHead.next = merge(pHead1, pHead2.next);
    }
    return pMergeHead;
}