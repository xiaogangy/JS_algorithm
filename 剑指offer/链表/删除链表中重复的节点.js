/**
 * @desc 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
 *
 * 思路：对于解题思路不够清晰的题目，最好的办法就是从实例入手。以题目中的例子为例，我们从头开始遍历链表，发现3重复后，需要做什么操作？我们需要把3前面的节点2，指向3后面的节点4。
 * 这说明我们需要在保存两个节点，一个是当前节点currentNode，还有前一个节点prevNode，这样才能保证删除重复节点之后链表是连通的。
 * 做链表的题目一定要注意分析一下链表的头结点和尾部节点的情况！
 * - 当头指针就重复时，我们最终返回的头指针是会变的，所以需要记录最新的头指针
 * - 当尾部节点重复时，没有特殊逻辑
 */

function deleteDuplication(head) {

    // 先声明并初始化几个追踪节点
    let prevNode = null;
    let currentNode = head;

    // 遍历链表
    while (currentNode !== null) {
        let nextNode = currentNode.next;

        // 当前值和下一个值重复
        if (nextNode && currentNode.val === nextNode.val) {
            const repeatVal = currentNode.val;
            // 要继续往后判断是否有同样的重复的值
            nextNode = nextNode.next;
            while (nextNode && nextNode.val === repeatVal) {
                nextNode = nextNode.next;
            }

            // 此时nextNode已经移动到不与当前值重复的下一个节点，例如已经移动到第一个值为4的节点
            if (currentNode === head) {
                // 如果从头结点就开始重复
                head = nextNode;
                currentNode = nextNode;
            } else {
                prevNode.next = nextNode;
                currentNode = nextNode;
            }
        } else {
            // 当前值没有和下一个值重复
            prevNode = currentNode;
            currentNode = nextNode;
        }

    }

    return head;
}

function Node(value) {
    this.val = value;
    this.next = null;
}

function testFunc() {
    const node1 = new Node(1);
    const node2 = new Node(2);
    const node3 = new Node(3);
    const node4 = new Node(3);
    const node5 = new Node(4);
    const node6 = new Node(4);
    const node7 = new Node(5);
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    node5.next = node6;
    node6.next = node7;

    console.log(deleteDuplication(node1));
}

testFunc();