/**
 * @desc 给定单向链表的头指针和和一个节点指针，定义一个函数在O(1)时间内删除该节点。
 *
 * 思路：如果用常规解法，从头结点开始顺序查找指定的节点，找到之后再删除，则这样的时间复杂度为O(n)，显然不符合题意。
 * 其实有一种取巧的方法，之所以前面我们需要遍历找到待删除节点，其实是为了找待删除节点的前一个节点，然后去改它的next值。
 * 其实我们不一定需要，由节点指针，我们总可以在O(1)内找到它的下一个节点，我们把下一个节点的value复制到待删除节点中，然后将待删除节点
 * 的next指针指向next.next，这些操作都是可以在O(1)时间内完成的。
 */

/**
 * 删除指定的节点。这里有几种特殊的情况需要考虑：
 * - 当待删除的节点是尾结点时，我们需要把它的前一个节点的next置为null，所以还是得顺序查找
 * - 当待删除的节点head节点，且链表就只有一个元素时，记得把head设置为null
 *
 * @param {*} head 头指针
 * @param {*} toBeDeleted 待删除节点
 */
function deleteNode(head, toBeDeleted) {
    // 健壮性：如果head或者toBeDeleted是空指针，直接返回
    if (!head || !toBeDeleted) {
        throw new Error('空指针异常');
    }
    // 要删除的节点不是尾节点
    if (toBeDeleted.next !== null) {
        // 拿到下一个节点的值
        const nextNode = toBeDeleted.next;
        toBeDeleted.value = nextNode.value;
        toBeDeleted.next = nextNode.next;
    } else if (toBeDeleted === head && toBeDeleted.next === null) {
        // 删除的是头结点，而且链表就这一个元素
        head = null;
    } else {
        // 链表长度大于1，删除尾结点，这个时候需要顺序查找尾结点的上一个节点
        let preNode = head;
        while (preNode.next !== toBeDeleted) {
            preNode = preNode.next;
        }
        preNode.next = null;
    }
}