/**
 * @file 链表
 */

// Node节点
function Node(data) {
  this.data = data;
  this.next = null;
}

// Linked-List
// 操作应该放到原型链上
function LinkedList() {
    this.head = null;
	// 为了方便查找，增加一个last指针
    this.last = null;
    this.size = 0;
}

// 插入
LinkedList.prototype.insert = function (index, data) {
    if (index < 0 || index > this.size) {
        throw new Error('插入位置不合法');
    }
    const node = new Node(data);
    if (this.size === 0) {
        // 链表为空
        this.head = node;
        this.last = node;
    } else if (index === this.size) {
        // 队尾插入
        this.last.next = node;
        this.last = node;
	} else if (index === 0) {
        // 插入到头部
        node.next = this.head;
        this.head = node;
    } else {
        // 中间插入
        const prev = this.get(index - 1);
        const current = prev.next;
        node.next = current;
        prev.next = node;
    }
    this.size++;
};
// 查找
LinkedList.prototype.get = function (index) {
    if (index < 0 || index > this.size) {
        throw new Error('位置不存在');
    }
    let ret = this.head;
    for (let i = 0; i < index; i++) {
        ret = ret.next;
    }
    return ret;
};
// 删除
LinkedList.prototype.delete = function (index) {
    if (index < 0 || index >= this.size) {
        throw new Error('位置不存在');
    }
    if (this.size === 1) {
        this.head = null;
        this.last = null;
    } else if (index === 0) {
        // 删除头部元素
        this.head = this.head.next;
    } else if (index === this.size - 1) {
        // 删除队尾元素
        const pre = this.get(index - 1);
        pre.next = null;
        this.last = pre;
    } else {
        // 中间删除
        const pre = this.get(index - 1);
        const next = pre.next.next;
        const current = pre.next;
        current.next = null;
        pre.next = next;
    }
    this.size--;
};
// 更改
LinkedList.prototype.modify = function (index, data) {
    if (index < 0 || index >= this.size) {
        throw new Error('位置不存在');
    }
    const node = this.get(index);
    node.data = data;
};
// 输出
LinkedList.prototype.output = function () {
    let current = this.head;
    const allData = [];
    for (let i = 0; i < this.size; i++) {
        allData.push(current.data);
        current = current.next;
    }
    console.log(allData.join('->'));
};

const L = new LinkedList();
L.insert(0, 1);
L.insert(1, 2);
L.insert(2, 3);
L.delete(1);
L.delete(1);
L.delete(0);
L.output();
