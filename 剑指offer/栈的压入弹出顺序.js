/**
 * @desc 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。
 * 例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
 *
 * 思路：对于第一眼找不到解法的题目，我们也是通过分析实际案例来找到解法。以题目中的4,5,3,2,1为例，因为第一个弹出的元素是4，说明压入栈中当前的状态是1,2,3,4，然后弹出序列的第二个
 * 元素是5，压入栈栈顶没有这个元素，我们就查看待入栈元素序列中有没有这个元素，方法是依次把待插入元素压入到压入栈，直到栈顶元素为当前待弹出元素5，此时弹出5。然后看第三个弹出元素，
 * 是3，当前栈顶元素也为3，依次类推，3，2，1的顺序是可以有保证的。
 *
 * solution: 需要借助一个辅助栈来实践真实的压入和弹出，用A表示
 * 1. 查看弹出序列的第一个元素，根据这个值的大小，将元素从输入序列中依次弹入到输入栈中，直到栈A栈顶元素为弹出序列的第一个元素。此时弹出栈A的栈顶元素。
 * 2. 再查看弹出序列的中的第二个元素，如果当前栈A的栈顶元素等于这个第二个元素，那就弹出栈顶元素，如果不是？老规矩，把输入序列中的元素依次压入到栈A中，直到把对应元素压入才停止，然后弹出栈A的栈顶元素。
 * 如果输入序列中的元素都压入完了，还没找到对应元素，就说明这个元素值都不对，当然是不合法的。如果输入序列中已经没有元素了，但是当前栈A栈顶元素和待弹出的序列不一样，也说明这个弹出序列是不合法的。
 */

/**
 * 判断一个序列是不是某个压入顺序的弹出序列
 * @param {*} pushV 输入序列
 * @param {*} popV 弹出序列
 */
function isPopOrder(pushV, popV) {

    let isValid = false;
    // 声明一个辅助数组用来实践我们真实的压入和弹出
    let stackA = [];
    let i = 0;
    for (; i < popV.length; i++) {
        const currentElement = popV[i];
        // 如果辅助栈栈顶元素不等于当前弹出元素，就一直压入
        while (stackA[stackA.length - 1] !== currentElement && pushV.length) {
            stackA.push(pushV.shift());
        }
        if (stackA[stackA.length - 1] === currentElement) {
            stackA.pop();
            continue;
        } else if (!pushV.length) {
            break;
        }
    }
    // 如果输出序列访问完了，辅助栈中也没元素了，那就是一个合法的输出序列
    if (!stackA.length && i === popV.length) {
        isValid = true;
    }
    return isValid;

}

function testFunc() {
    const input = [1, 2, 3, 4, 5];
    const out1 = [4, 5, 3, 2, 1];
    const out2 = [4, 3, 5, 1, 2];
    const out3 = [5, 3, 6, 7, 9];
    const output = [out1, out2, out3];
    output.forEach(item => {
        console.log(isPopOrder(input, item));
    });
}
testFunc();