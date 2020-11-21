/**
 * @desc 请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。
 * 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配。
 *
 * solution: 这道题一直拖拖拖，拖到现在才写，因为一直不想复习正则，感觉看了就忘（虽然本人其实正则学的还行……哈哈哈），但是今天一看才发现，这道题
 * 其实跟正则匹配没啥关系嘛，就是模拟正则而已，所以看了看，终于写完了。
 * 这道题的突破点在于如何对待*这个字符，*表示前面的字符可以出现0次或者任意多次，这就表示在我们处理*的时候，不能单纯看它一个字符，而应该把它和前面的字符
 * 连起来看成一个整体。所以我们可以抽象的分成两步：
 * 1. 匹配第一个字符，如果第一个字符和正则的字符相同，或者正则的字符是'.'，就表示匹配到了
 * 2. 然后查看第二个字符，这时候关键就来了，如果第二个字符是*，通常我们自己思考的时候，也会返回去看一下*前面的字符，所以在写程序的时候，也是要先判断一下
 * 第二个字符，再看第一个字符。所以准确来说，步骤应该是2 --> 1。那么为*的情况下如何处理呢？*的匹配总共可以分为三种情况：0次、1次、多次。但是这三种情况
 * 并不一定是全部都可以发生的，所以这里又要分两种情况：
 * 1）前面的字符已经匹配了（3种状态皆可转移）
 * 则有三种状态可以变化：
 * - 1. *和它前面的字符都算作用完了，正则进2，字符串进1         --匹配 1 次
 * - 2. 字符串进1，正则不变，表示正则打算拿这个*匹配更多的字符      --匹配 多 次
 * - 3. 字符串不动，正则进2，表示即使你匹配到我字符串中的这个字符了，但是我不想要这次的匹配，想要下次的。       --匹配 0 次
 * 2）如果前面的字符没有匹配到呢？
 * 简单，只让正则进2，意思是拿后面的正则继续来匹配当前的字符        --*前字符匹配了0次
 *
 * 如果第二个字符不是*呢？
 * 按照我们上面的说法，我们其实是先判断第二个字符的，所以这时候我们要返回去判断第一个字符能否匹配了。如果能匹配到，那么让正则和字符串各进一步，如果不能匹配到？
 * 当然就匹配失败啦！
 */

/**
 * 判断当前字符串能否完整匹配整个模式
 * @param {*} s 待匹配的字符串
 * @param {*} pattern 正则表达式
 * @return {boolean} 匹配结果
 */
function match(s, pattern) {
    // 空字符和空正则，都直接返回false
    if (s === null || pattern === null) {
        return false;
    }
    // 进入核心方法
    return matchCore(s, 0, pattern, 0);
}

/**
 * 为了降低空间复杂度，用了两个索引来track匹配过程
 * @param {*} string 待匹配的字符串
 * @param {*} sIndex 当前匹配字符串第几个字符
 * @param {*} pattern 正则表达式
 * @param {*} pIndex 当前正在校验正则表达式哪个字符
 * @return {boolean} 返回是否完整匹配
 */
function matchCore(string, sIndex, pattern, pIndex) {
    // 递归出口1：二者都走到了末尾
    if (sIndex === string.length && pIndex === pattern.length) {
        return true;
    }
    // 递归出口2：字符串还没匹配完，但是pattern已经用完了，这时候要返回false
    // 那么字符串匹配完了，pattern还没用完的情况呢？我们不能贸然返回false，因为还有可能'aaa'和'a*a*a*a*'这样的情况，要交给递归去判断
    if (sIndex !== string.length && pIndex === pattern.length) {
        return false;
    }

    // 这里的逻辑是：我们先判断第二个字符是不是*，是*的情况比较复杂
    if (pattern[pIndex + 1] === '*') {
        // 第二个字符是*的情况，然后再判断第一个字符是否匹配成功了。这里要注意一点用'.'来匹配所有字符的情况，一定要保证字符串当前还不为空，
        // 也就是sIndex !== string.length
        // @date 2020/11/21 再解释这里为什么要有一个sIndex !== string.length
        // 在上面递归出口那里，我们强调了，字符串走完但是模式串没走完的情况，不能贸然返回，那这种情况下我们就进入了新一轮的递归，举个例子如下：
        // 字符串是abc，当前sIndex === 3，也就是已经走越界了；模式串是abc.*，此时pIndex也等于3，位置处的元素是'.'，而且下一个元素是'*'。
        // 那么请问，'*'前的元素是'.'，可不可以状态转移有三种情况呢？显然是不行的，因为字符串都走完了啊，你再给sIndex加是什么意思？
        if (pattern[pIndex] === string[sIndex] || (pattern[pIndex] === '.' && sIndex !== string.length)) {
            // 如果第一个字符也匹配成功了，那么可以以三种方式进入递归
            // 1. *和它前面的字符都算作用完了，正则进2，字符串进1
            // 2. 字符串进1，正则不变，表示正则打算拿这个*匹配更多的字符
            // 3. 字符串不动，正则进2，表示即使你匹配到我字符串中的这个字符了，但是我不想要这次的匹配，想要下次的
            return (matchCore(string, sIndex + 1, pattern, pIndex + 2)
                || matchCore(string, sIndex + 1, pattern, pIndex)
                || matchCore(string, sIndex, pattern, pIndex + 2)
                );
        } else {
            // 这个就很明显了，如果当前字符没有匹配到，那么字符串不动，正则进2
            return matchCore(string, sIndex, pattern, pIndex + 2);
        }
    } else {
        // 第二个字符不是*的情况，比较简单，如果第一个字符匹配了，那就进入递归；如果没匹配，就返回false
        if (pattern[pIndex] === string[sIndex] || (pattern[pIndex] === '.' && sIndex !== string.length)) {
            return matchCore(string, sIndex + 1, pattern, pIndex + 1);
        }
        return false;
    }
}

function testFunc() {
    const patterns = ['a.a', 'ab*ab*ab*', 'aa.a', 'ab*a', '******', 'aaa.*a'];
    const string = 'aaa';
    patterns.forEach(p => {
        console.log(match(string, p));
    });
}
testFunc();
