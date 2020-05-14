/**
 * @desc 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
 * 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
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
 * 
 * @param {*} list 进行全排列的字符
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