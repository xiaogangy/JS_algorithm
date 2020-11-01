/**
 * @file KMP算法
 * @desc KMP算法是一种字符串匹配算法，可以在O(m+n)的时间复杂度内实现两个字符串的匹配。具体问题表示为：“字符串 P 是否为字符串 S 的子串？如果是，它出现在 S 的哪些位置？” 其中 S 称为主串；P 称为模式串。
 *
 * 首先说明一下，我非常喜欢这个KMP算法，我觉得这个算法是真的在生活中会经常用到的，非常有效的方法，所以在这里实现一下。至于分析，我是参考了知乎上一位大佬的讲解，在这里我就不费口舌了，我肯定没有人家讲的好，抛出链接就好了：https://www.zhihu.com/question/21923021，阮行止。
 * 仅仅强调KMP算法理解上和实现上的几个重点：
 * - 如何利用失败的信息，来减少匹配的次数？ 引出next数组
 * - next数组：应用于模式串pattern的数组，next[i] 表示 P[0] ~ P[i] 这一个子串，使得 前k个字符恰等于后k个字符 的最大的k。特别地，k不能取i+1，也就是说k不能等于字符串的长度，不然这个next数组就没有意义了。
 * - next数组的构建是基于动态规划思想的
 * - 主串和模式串比较的时候，是移动指向二者正在比较位置的指针
 */

function buildNext(pattern) {
    // next数组，第一个元素的的值显然为0
    const next = [0];
    let i = 1;
    // now = next[i - 1]
    const now = 0;

    while (i < pattern.length) {
        // 如果当前指向的元素和now指向的元素相同，显然直接在前者基础上加1就可以
        if (pattern[i] === pattern[now]) {
            now++;
            i++;
            next.push(now);
        } else if (now > 0) {
            now = next[now - 1];
        } else {
            // now === 0 && pattern[i] !== pattern[now], 说明一个字符都没匹配到
            i++;
            next.push(0);
        }
    }

    return next;
}

/**
 * KMP算法
 * @param {*} target 目标串
 * @param {*} pattern 模式串
 * @return {Array} 返回所有匹配位置的索引
 */
function KMP(target, pattern) {
    if (!target || !pattern) {
        return [];
    }
    const result = [];
    // 构建next数组
    const next = buildNext(pattern);
    // 声明两个指针，分别表示目标串和模式串当前正在比较的位置索引
    let tar = 0;
    let pos = 0;

    while (tar < target.length) {
        if (target[tar] === pattern[pos]) {
            tar++;
            pos++;
        } else if (pos > 0) {
            // 匹配失败，但是当前模式串的比较位置不是第一个元素
            pos = next[pos - 1];
        } else {
            // 匹配失败，且当前是在进行第一个位置比较时就失败了
            tar++;
        }

        if (pos === pattern.length) {
            result.push(tar - pos);
            pos = next[pos - 1];
        }
    }

    return result;
}


function testFunc() {
    const target = 'tobeornottobe';
    const pattern = 'to';
    console.log(KMP(target, pattern));
}

testFunc();