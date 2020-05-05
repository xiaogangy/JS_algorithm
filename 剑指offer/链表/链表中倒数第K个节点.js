/**
 * @desc 　输入一个链表，输出该链表中倒数第k个结点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾结点是倒数第1个结点。
 * 例如一个链表有6个结点，从头结点开始它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个结点是值为4的结点。
 *
 * 思路：倒数第K个节点，一般思路而言，也就是说我们要从最后一个节点，倒数走K-1步，但是这是个单向链表，这种想法肯定行不通。那么还有一种思路，
 * 如果链表总长是n，倒数第k个节点也就是正数第n-k+1这个节点，因此我们可以先进行一次遍历，求得链表的长度，然后再进行第二次遍历，找第n-k+1个节点。
 * 这种方法需要遍历两次链表，时间复杂度较高，可以设置两个指针，实现一次遍历就找到目标节点：
 * - 设置第一个first指针，从起点出发走k - 1步；
 * - 再设置一个second指针，位于起点。
 * - first指针和second指针同时往前走，当first指针走到链表结尾的时候，second指针指向的就是倒数第K个节点
 *
 * 当然这道题的考点不止是这个算法，还有代码的鲁棒性，我们需要充分考虑上述问题可能的输入情况：
 * 1. 当输入的链表是个空链表？直接返回null值
 * 2. 当输入的K值为0？明显不符合逻辑，返回null
 * 3. 当输入的链表的长度小于k？直接返回null
 * 如果不对上述三种情况进行特殊处理，那么特殊的测试用例会直接导致程序崩溃，GG，面试还是过不了
 */

function findKthToNail(head, k) {

        // 先处理一下第1，2种情况
        if (!head || k === 0) {
            return null;
        }

        let first = head;
        for (let i = 0; i < k - 1; i++) {
            // 注意处理情况3
            if (first.next) {
                first = first.next;
            } else {
                return null;
            }
        }

        let second = head;
        while (first.next) {
            second = second.next;
            first= first.next;
        }

        return second;
}


/**
 * 扩展：求链表的中间节点。如果链表中的节点总是为奇数，则返回中间节点。如果节点总是是偶数，则返回中间两个节点的任意一个。
 * solution：设置两个指针，都从起点出发，一个走1步，一个走2步，当快指针走到链表的末尾时，慢指针刚好在链表的中间
 */

/**
 * 举一反三：如果用一个指针遍历链表不能解决问题的时候，可以尝试用两个指针来遍历链表。一个走的快一些，一个走的慢一些；或者让一个先走若干步，二者再同时出发
 */