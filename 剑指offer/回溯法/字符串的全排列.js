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


// 第一版：
function Permutation(str) {
    if (!str) {
        return [];
    }
    // 保存可以拼成的字符串
    let result = [];
    const list = str.split('');
    permutationCore(result, [], list);

    return result;
}

/**
 * 对一组数字进行全排列。在一次递归中，我们需要知道当前已经有哪些字符进行了排列，还剩哪些字符还没排列，以及最终的结果数组。
 *
 * @param {*} result 用于最后保存所有排列的数组
 * @param {*} currentResult 当前这次排列中已经存入数组的字符
 * @param {*} list 用于全排列的字符数组
 */
function permutationCore(result, currentResult, list) {

    // 递归出口：待全排列的字符串长度为0
    if (!list.length) {
        const str = currentResult.join('');
        // 用&&是因为测试用例中有'aa'这种情况，如果不排除，会出现两个'aa'
        !result.includes(str) && result.push(str);
        return;
    }
    // 回溯写法是有规律可循的，简单说就是结构上是对称的，如以下代码：
    // 先把字符弹出，然后插入数组中；再执行递归函数；执行完递归函数后要把之前的元素再加回来，然后弹出之前添加的数组
    for (let i = 0; i < list.length; i++) {
        // 选择当前元素作为填充的第一个元素
        currentResult.push(list[i]);

        const newList = [...list.slice(0, i), ...list.slice(i + 1)];
        permutationCore(result, currentResult, newList);

        // 当前这一次选择这个元素的子全排列已经结束了，自然要把这次的选择改回去
        currentResult.pop();
    }
}

/**
 * 第二版：@date 2020-7-13
 * 今天看到这个以前的解法，觉得空间复杂度太大了一些，permutationCore中每次都要生成新的数组，所以想着是不是通过数组元素的交换，
 * 可以实现降低空间复杂度的预期。但是没有按照字典序排列，如果在牛客上可能没办法all pass
 */
function permutation(str) {
    if (!str) {
        return [];
    }
    const original = str.split('');
    const result = [];
    permutationCoreImprove(original, result, 0, str.length);
    return result;
}

/**
 * 全排列的主要函数
 *
 * @param {*} list 当前在全排列的数组
 * @param {*} result 结果数组，存储全排列成的字符串
 * @param {*} modIndex 当前在排列第几位字符串
 * @param {*} length 全排列数组的长度
 */
function permutationCoreImprove(list, result, modIndex, length) {
    // 1. 递归出口：数组中的所有字符都已经用过了
    if (modIndex === length) {
        const str = list.join('');
        // 防止重复字符串插入
        !result.includes(str) && result.push(str);
        return;
    }

    // 2. 在剩余的数组元素中，依次选择一个元素，放到当前待填充的位置，然后递归下一轮
    // i表示这一轮要找哪个元素，填充到待填充的位置，其实就是交换过去
    for (let i = modIndex; i < length; i++) {
        // 注意这里有回溯的思想，用完的东西要放回去，所以这里的写法是对称的；
        // 2.1) 交换
        let temp = list[i];
        list[i] = list[modIndex];
        list[modIndex] = temp;

        // 2.2) 当前填充的位置已经放了一个元素了，可以进行下一轮的递归了
        permutationCoreImprove(list, result, modIndex + 1, length);

        // 2.3) 后面的递归已经执行完，这时候要把在这一轮中出现的修改，改回去
        temp = list[i];
        list[i] = list[modIndex];
        list[modIndex] = temp;
    }

}


function testFunc() {
    console.log(Permutation('aa'));
    console.log(permutation('aa'));
}

testFunc();