/**
 * @description 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，并返回拷贝后的头结点。
 *
 * 思路：复杂链表除了有next指针之外还有个random指针，所以我们的直观思路就是先复制链表的所有节点，这一步相当于是根据next进行的，第二步我们复制节点的random指针。那么这里怎么复制呢？
 * 比如说原链表中有个节点是N，它的random指针指向了节点S，当然我们N'节点的random指针也要指向S'节点，问题就来了，怎么找这个S'节点，最常规的方法就是在原链表中我们确定了S节点后，从头节点
 * 开始一步一步的找S节点，记录找了多少路径，然后把这个路径应用在复制的链表中，这样就可以找到S'节点。这样的话，每个节点都需要经过O(n)的时间复杂度才能找到，总的时间复杂度为O(n^2)。这样的
 * 时间复杂度有点太高了，我们下面通过两种方法来实现在O(n)内找到S’节点。
 */

function RandomListNode(x) {
    this.label = x;
    this.next = null;
    this.random = null;
}

/**
 * 方法1：我们仍然是通过两步来复制复杂链表。
 * 1. 我们还是根据next指针来复制原链表上的每个节点，只不过在复制的时候，我们要把<N,N'>保存在一个哈希表里，这样当我们在找到S的时候，自然就会在O(1)的时间内找到S'.
 * 2. 复制链表的random指针，N节点的random指针是S，那么N'节点的random指针就是S'，我们在哈希表中找到<S,S'>就可以得到S'节点
 * @param {*} pHead 待复制的复杂链表
 */
function Clone_1(pHead) {
    if (!pHead) {
        return null;
    }

    // 保存N和N'的映射
    const hashmap = new Map();

    // 把头结点复制一下
    let pNode = pHead;
    let clonedNode = new RandomListNode(pNode.label);
    const clonedNodeHead = clonedNode;
    hashmap.set(pNode, clonedNodeHead);

    let pNextNode = null;
    let clonedNextNode = null;

    // 1. 先复制节点与next指针
    while (pNode.next) {
        // 复制下一个节点，并更新next指针
        pNextNode = pNode.next;
        clonedNextNode = new RandomListNode(pNextNode.label);
        clonedNode.next = clonedNextNode;

        // 把next节点的映射关系也加入到hashmap中
        hashmap.set(pNextNode, clonedNextNode);

        // 更新要访问的节点
        pNode = pNextNode;
        clonedNode = clonedNextNode;
    }

    // 2. 再复制每个节点的random指针
    pNode = pHead;
    clonedNode = clonedNodeHead;
    while (pNode) {
        // 从hashmap中获取当前节点的random节点，然后更新cloneNode节点的random’节点
        const pRandomNode = pNode.random;
        if (pRandomNode) {
            const clonedRandomNode = hashmap.get(pRandomNode);
            clonedNode.random = clonedRandomNode;
        }
        // 更新要访问的节点
        pNode = pNode.next;
        clonedNode = clonedNode.next;
    }

    return clonedNodeHead;

}

/**
 * 方法2：下面这种方法不借助辅助空间，用一种比较取巧的方法来解决问题，主要分为三个步骤
 * 1. 还是先复制原始链表的每个节点，但是我们吧N'添加到N后面
 * 2. 设置复制出来的节点的random指针，假设N节点的random指针指向S，那么N'的random指针就指向S'，根据第一步我们知道
 * S'显然是正后方的节点。
 * 3. 把这个长链表拆解成两个链表：把奇数位置的节点用next指针链接起来，就是原始链表，把偶数位置的几点用next指针链接起来
 * 就是复制出来的链表
 * @param {*} pHead 待复制的复杂链表
 */
function Clone_2(pHead) {
    cloneNodes(pHead);
    connectRandomNodes(pHead);
    return reconnectNodes(pHead);
}

/**
 * 第一步：复制原始链表的节点，复制的节点位于原节点的后方
 * @param {*} pHead 原始链表
 */
function cloneNodes(pHead) {
    // 声明追踪节点的变量
    let pNode = pHead;
    while (pNode) {
        const pClonedNode = new RandomListNode(pNode.label);
        pClonedNode.next = pNode.next;
        pNode.next = pClonedNode;
        pNode = pClonedNode.next;
    }
}

/**
 * 第二步：把复制出来的节点的random指针更新到指定位置
 * @param {*} pHead 原始链表
 */
function connectRandomNodes(pHead) {
    // 声明追踪节点
    let pNode = pHead;
    
    while (pNode) {
        const pClonedNode = pNode.next;
        if (pNode.random) {
            pClonedNode.random = pNode.random.next;
        }
        pNode = pClonedNode.next;
    }
}

/**
 * 第三步：按照奇数偶数的位置，把原始链表和复制的链表拆分出来，并把复制的链表的头指针返回
 * @param {*} pHead 原始链表
 */
function reconnectNodes(pHead) {
    // 原始链表为空，复制的链表当然也为空
    if (!pHead) {
        return null;
    }
    let pNode = pHead;
    let pClonedNode = pHead.next;
    const pClonedHead = pClonedNode;

    while (pNode) {
        pNode.next = pClonedNode.next;
        pNode = pNode.next;
        if (pNode) {
            pClonedNode.next = pNode.next;
            pClonedNode = pClonedNode.next;
        }
    }

    return pClonedHead;
}

function testFunc() {
    const nodeA = new RandomListNode('A');
    const nodeB = new RandomListNode('B');
    const nodeC = new RandomListNode('C');
    const nodeD = new RandomListNode('D');
    const nodeE = new RandomListNode('E');
    nodeA.next = nodeB;
    nodeA.random = nodeC;
    nodeB.next = nodeC;
    nodeB.random = nodeE;
    nodeC.next = nodeD;
    nodeC.random = null;
    nodeD.next = nodeE;
    nodeD.random = nodeB;

    console.log(Clone_2(nodeA));
}

testFunc();
