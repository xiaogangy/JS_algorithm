/**
 * @desc 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
 * 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
 *
 * 思路：当我们自己解决全排列问题的时候，想想我们是怎么做的？我们会首先挑出来其中的一个，然后再从剩余的里面挑选一个，持续这个
 * 过程，然后直到所有的字符都已经被挑完。那么我们是如何知道所有的排列组合情况呢？当我们完成一个排列后，我们会改变其中的一位，通常
 * 我们会改变低位的顺序，因为这样我们的思路更清晰，然后寻找另外一组排列情况。举个例子，我们给abc三个字母进行全排列，我们假设先选择了
 * a作为第一个字符，然后b为第二个，c为第三个；第二次，我们通常会选择c作为第二个，b为第三个（我们通常不会去先改变高位，这会造成混乱）。
 * 然后我们再改变第一个字符……依次类推，我们就会找到所有的排列情况。
 * 其实上面BB这么多，只是想说，经过这样的分析，我们会发现这是一道回溯的题目，我们每一步都有多种选择，完成一次排列后，我们又回退到最近一次
 * 操作的上一步，然后采取另外一种选择，这就是回溯。so，接下来重点就是如何抽取递归的模块？这里的递归模块也比较简单，我们在某个位置选择了一个
 * 字符后，对于剩余的位置，就是对剩余所有字符的全排列。看！我们这就找到了可以递归的函数，即对N个字符的全排列 = 在第一位随机选择一个字符后再对
 * 剩余的字符进行全排列。接下来就是代码了……
 */

function Permutation(str) {
    if (!str) {
        return [];
    }
    let result = [];
    const list = str.split('');
    permutationCore(result, [], list);
    
    return result;
}

/**
 * 对一组数字进行全排列
 * @param {*} result 用于最后保存所有排列的数组
 * @param {*} currentResult 当前这次排列中已经存入数组的字符
 * @param {*} list 用于全排列的字符数组
 */
function permutationCore(result, currentResult, list) {

    if (!list.length) {
        const str = currentResult.join('');
        !result.includes(str) && result.push(str);
        return;
    }
    // 回溯写法是有规律可循的，简单说就是结构上是对称的，如以下代码：
    // 先把字符弹出，然后插入数组中；再执行递归函数；执行完递归函数后要把之前的元素再加回来，然后弹出之前添加的数组
    for (let i = 0; i < list.length; i++) {
        // 选择当前元素作为填充的第一个元素
        currentResult.push(list[i]);
        const newList = [...list.slice(0, i), ...list.slice(i + 1)]

        permutationCore(result, currentResult, newList);

        currentResult.pop();
    }
}

function testFunc() {
    console.log(Permutation('aa'));
}

testFunc();