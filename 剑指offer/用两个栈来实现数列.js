/**
 * @description 用两个栈来实现一个队列，完成队列的Push和Pop操作。
 * 
 * solution：这个题在小灰算法中已经出现，所以这儿就简单说一下思路。设有A,B两个栈
 * - 当有元素要插入时，数据都插入到栈A中
 * - 当要弹出元素时，如果栈B为空，则依次把栈A的所有元素弹入到栈B，然后弹出栈B栈顶的元素；如果栈B本身就有元素，就把栈B的栈顶元素弹出
 */

const A = [];
const B = [];

function push(node) {
    A.push(node);
}
function pop() {
    if (!A.length && !B.length) {
        return null;
    }
    // B中本来就有值
    if (B.length) {
        return B.pop();
    }
    // B中没有值，需要把A中元素全部灌入
    while (A.length) {
        B.push(A.pop());
    }
    return B.pop();
}