/**
 * @description 实现一个栈，该栈带有入栈（push），出栈（pop），取最小元素（getMin）3个方法。
 * 要保证这三个方法的时间复杂度都是O(1)。
 * 思路：入栈、出栈操作不用多说，这里用两个栈来实现取最小值O(1)的操作
 * 设置两个栈A和B，B栈用来追踪A栈中的最小元素
 * - 当A栈为空，往A栈中插入元素时，将该元素也推入栈B（此时第一个元素为最小元素）
 * - 当继续往A推入元素时，如果推入的元素小于当前栈A的最小元素（栈B栈顶元素），则将其也推入到栈B，否则不推入B
 * - 当从栈A弹出元素时，如果当前栈A弹出的元素恰好是栈A的最小元素，则把栈B的栈顶元素也弹出（二者是同一个元素）
 * - 获取栈的最小值时，直接获取栈B的栈顶元素
 */

// 用ES6的class实现
class stack {
    // 构造器
    constructor() {
        this.stackA = [];
        this.stackB = [];
    }
    // 入栈
    push(data) {
        const lengthA= this.stackA.length;
        const lengthB= this.stackB.length;
        // 1. 如果当前栈A栈B都为空，则表示是插入第一个元素，此时要插入到二者
        // 2. 判断当前插入的元素是否小于栈B栈顶元素，即是否是栈A的最小元素，如果是，则将其同时压入A和B；
        //    否则只插入到栈A
        if ((!lengthA && !lengthB) || (this.stackB[lengthB - 1] >= data)) {
            this.stackA.push(data);
            this.stackB.push(data);
            return;
        } else {
            // 否则只压入栈A
            this.stackA.push(data);
        }
    }
    // 出栈
    pop() {
        // 如果当前栈A或B为空，抛出错误
        if (!this.stackA.length || !this.stackB.length) {
            throw new Error('当前栈为空');
        }

        const lengthB = this.stackB.length;
        const lengthA = this.stackA.length;
        // 如果当前栈A的栈顶元素即为最小元素，则同时弹出栈A和栈B的栈顶元素
        if (this.stackA[lengthA - 1] === this.stackB[lengthB - 1]) {
            this.stackA.pop();
            this.stackB.pop();
        } else {
            this.stackA.pop();
        }
    }
    // 获取最小值
    getMin() {
        const lengthB = this.stackB.length;
        if (!lengthB) {
            throw new Error('当前栈为空');
        }
        return this.stackB[lengthB - 1];
    }
}

function test() {
    const s = new stack();
    s.push(4);
    s.push(9);
    s.push(7);
    s.push(3);
    s.push(8);
    s.push(5);
    console.log(s.getMin());
    s.pop();
    s.pop();
    s.pop();
    console.log(s.getMin());
}

test();