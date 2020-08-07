/**
 * @description LRU算法，全名为least recently used，即最近最少使用算法，是一种调度算法。用来解决在空间不够时，如何剔除旧的元素，为新的元素腾出空间。
 * 先说一下应用场景：有时候我们直接操作数据库比较耗时，所以我们需要把一些经常访问的元素拿出来存到缓存中，然后动态替换缓存中的值。如果要找的某个值不在缓存中呢？
 * 由于缓存容量有限，我们需要剔除一些元素，给新元素腾出来空间，那么剔除哪个元素就就需要使用LRU。同样的，另外一个问题是，使用缓存我们要的就是快速查找，那么比如
 * 推荐的结构就是哈希表，所以这里就引申出了一种新的数据结构，即哈希链表。
 *
 * 我们知道哈希表在逻辑上是无所谓排列顺序的，而链表是一种有固定顺序的线性结构，将二者结合即为哈希链表。
 * 哈希链表，首先是一个哈希表，我们知道哈希表是key-value的键值对；哈希链表中的value比较特殊，是一个node，这个node里存储里value，prev和next指针。
 * 这也说明了，在哈希链表中插入一个新的节点，不止是哈希表层面的操作，还有链表之间的连接操作。
 *
 * 思路：假如一个双向链表长度为5，新插入的元素都从右侧插入，自然的，最右侧的元素是最新的元素，最左侧的元素是最近最少使用的元素。当我们要访问一个存在于哈希链表
 * 中的元素时，找到它对应的节点，然后把它从哈希链表中删除，重新插入到最右侧，此时最右侧节点仍未最近访问过的节点，最左边的节点仍然是最最近最少使用的。如果空间不足时，
 * 直接删除最左边的节点即可。
 *
 */

function createLRUCache(limit) {

    // 声明缓存的大小
    const capacity = limit;
    // 哈希表，JS中即是一个对象，value是一个node节点
    const hashMap = {};
    // 设置头尾指针
    let head = null;
    let end = null;

    /**
     * 链表节点结构
     * @param {*} key 哈希节点的key值
     * @param {*} value 哈希节点的value值
     */
    function Node(key, value) {
        this.key = key; // 这个key是需要的，用来从node反向查找哈希表的key，在下面put的操作中可以看到
        this.value = value;
        this.pre = null;
        this.next = null;
    }

    // 以下几个操作是对链表的操作，不暴露出去
    /**
     * 尾部插入节点
     * 这里只是单纯的链表节点插入，不把长度判断放在这里
     * @param {*} node 待插入的节点
     */
    function addNode(node) {
        // 链表非空
        if (end !== null) {
            end.next = node;
            node.pre = end;
            node.next = null;
        }
        end = node;
        if (head === null) {
            head = node;
        }
    }

    /**
     * 删除节点
     * @param {*} node 待删除的节点
     * @return {string} node的key值
     */
    function removeNode(node) {
        if (node === head && node === end) {
            // 移除唯一节点
            head = null;
            end = null;
        } else if (node === end) {
            // 移除尾节点
            end = node.pre;
            end.next = null;
        } else if (node === head) {
            // 移除头节点
            head = node.next;
            node.next = null;
        } else {
            // 移除中间节点
            node.pre.next = node.next;
            node.next.pre = node.pre;
        }
        return node.key;
    }

    /**
     * 刷新节点，即把这个node放到链表的尾部
     * @param {*} node 被访问的节点
     */
    function refreshNode(node) {
        // 如果访问的是尾部节点，则无需移动节点
        if (node === end) {
            return;
        }
        // 移除节点
        removeNode(node);
        // 重新插入节点
        addNode(node);
    }

    // 以下方法才是在哈希链表层面上的操作，如上的操作都是在链表层面上的操作
    /**
     * 根据key值定位到要寻找的元素
     * @param {*} key 寻找的key
     * @return {Object} 返回找到的value值
     */
    function get(key) {
        const node = hashMap[key];
        if (!node) {
            return null;
        }
        refreshNode(node);
        return node.value;
    }

    /**
     * 在哈希链表中插入一个新的元素
     * @param {*} key 要插入元素的key
     * @param {*} value 要插入元素的value
     */
    function put(key, value) {
        let node = hashMap[key];
        if (!node) {
            // 如果key不存在，则插入key-value
            if (Object.keys(hashMap).length === capacity) {
                // 如果超出了缓存的大小，就把最左边的元素删掉
                const oldKey = removeNode(head);
                hashMap.delete(oldKey);
            }
            node = new Node(key, value);
            addNode(node);
            hashMap[key] = node;
        } else {
            // 如果key存在，则刷新key-value
            node.value = value;
            refreshNode(node);
        }
    }

    return {get, put};
}

function testFunc() {
    const lruCache = createLRUCache(5);
    lruCache.put('001', '用户信息1');
    lruCache.put('002', '用户信息2');
    lruCache.put('003', '用户信息3');
    lruCache.put('004', '用户信息4');
    lruCache.put('005', '用户信息5');
    // 访问一次002
    lruCache.get('002');
    lruCache.put('004', '用户信息4更新');
    lruCache.put('006', '用户信息6');
    console.log(lruCache.get('001'));
    console.log(lruCache.get('006'));
}

testFunc();