/**
 * @desc 0, 1, 2, ……, n-1这个n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。其实就是约瑟夫环问题。举个例子，
 * 0, 1, 2, 3, 4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，最后剩下的数字是3。
 *
 * solution1: 循环链表
 * 这种思路最简单，我们按照传入的n个数字，构造一个环形的链表，然后每次走m步，然后删除一个数字，然后继续进行。持续进行，直到最后剩下一个数字。这种解法比较直观，也最好理解，
 * 只是需要我们实现一个环形链表。
 *
 * solution2: 数学规律：思考过程中主要是索引与索引的映射
 * 我们记在n个元素中持续删除第m个元素后，最后剩下的值为f(n, m)。在删除第一个元素后，数组实际上剩下n-1个值，但是并不能直接套用公式f(n-1, m)，因为此时进行第二次删除时，起点并不是0，
 * 我们可以考虑将第一次删除后的数组往前拉m个元素，这样就又符合f(n, m)的定义了。因为不管公式怎样，最后得到的值肯定是一样的，所以可以得到f(n, m) = f(n-1, m) + m，但是又由于有可能数组越界，
 * 超过的部分会被接到头上，所以还要模 n，所以最后的递推公式为 f(n,m) = (f(n−1,m) + m) % n。具体的推导，可以查看剑指offer。
 * 递归的出口是什么呢？当n为1的时候，因为数组里只有一个数字，不需要进行删除，显然f(1, m) = 0;
 * 推荐参考：https://blog.csdn.net/yanweibujian/article/details/50876631（关于约瑟夫环的一些思考）
 */

function Node(value) {
    this.val = value;
    this.next = null;
    this.pre = null;
}

// date: 2021/03/29，改成双向链表，方便找前后节点
function createCycle(n) {
    const head = new Node(0);
    let pre = head;
    let current = null;

    for (let i = 1; i < n; i++) {
        current = new Node(i);
        current.pre = pre;
        pre.next = current;
        pre = current;
    }
    // 不要忘了最后把尾节点指向头结点
    pre.next = head;
    head.pre = pre;

    return head;
}

function solution1(n, m) {
    // 健壮性
    if (n < 1 || m < 1) {
        return -1;
    }

    // 1. 先构造环形链表
    let cycle = createCycle(n);

    // 2. 循环删除，直到节点数为1
    let toBeDel = cycle;

    let i = n;
    while (i > 1) {
        // 表示当前是第几个节点
        let j = 1;
        while (j < m) {
            toBeDel = toBeDel.next;
            j++;
        }
        // 删除节点
        const pre = toBeDel.pre;
        pre.next = toBeDel.next;
        toBeDel.pre = null;
        toBeDel.next = null;

        // 更新一些参数
        --i;
        toBeDel = pre.next;
    }

    // 3. 最后链表还剩下toBedel这个节点
    return toBeDel.val;
}

// -----------------------------------------华丽的分割线------------------------------------------- //

function solution2(n, m) {
    // 健壮性
    if (n < 1 || m < 1) {
        return -1;
    }

    // 采用循环的写法来得到最后结果
    let last = 0; // 这里表示的就是f(1, m)
    // 下面的i表示是实际上是n，也就是依次求f(2, m), ……, f(n, m)
    for (let i = 2; i <= n; i++) {
        // 看两个例子就知道为啥下面这么写了：
        // f(3, m) = (f(2, m) + m) % 3;
        // f(4, m) = (f(3, m) + m) % 4;
        last = (last + m) % i;
    }

    return last;
}

function testFunc() {
    const n = 5;
    const m = 3;
    console.log(solution1(n, m));
    console.log(solution2(n, m));
}
testFunc();