/**
 * @desc 请从字符串中找到一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。字符串中只包含'a'~'z'的字符。
 * 例如，在字符串“arabcacfr”中，最长的不含重复字符的子字符串是“acfr”，长度为4。
 *
 * 思路：这道题有两种solution，下面都讨论一下
 * solution1: 滑动窗口
 * 滑动窗口，我的理解就是一个可以自由伸缩的窗口，包含字符串中的一些字符。同时为了快速判断某个字符是否在滑动窗口中，我们需要一个哈希表，其中key表示字符，
 * value表示指定字符在滑动窗口最近一次出现的位置。为了记录滑动窗口的位置，我们需要一个变量start表示滑动窗口的起点索引，还需要一个当前遍历到的位置索引index。
 * 以“arabcacfr”为例，我们从头开始扫描，在扫描到‘a’时，此时哈希表中还没有字符'a'，把字符'a'添加到哈希表中，然后我们继续向后遍历，遇到了r，哈希表中还是没有，
 * 把r加入到哈希表中，然后继续。当扫描到第2个a的时候，发现a已经出现在哈希表中了，此时我们要更新几个值，先更新当前的maxlength = index - start；然后start的值
 * 要变为哈希表中的重复字符a的value+1值，表示滑动窗口的起点要移动到重复值后面了；哈希表中的a值要更新为当前遇到的这个a的索引值，表示最近一次遇到的a的位置。
 * 要注意的是，在从哈希表中判断某个字符是否出现过的时候，假如在哈希表中出现过，我们还要把这个值出现的位置和start的值进行比较，如果小于start值，说明这个值上次出现
 * 的位置已经是在滑动窗口外了，没有任何意义了。
 * 上面可以看到maxlength = index - start，所以只要index和start发生变化的时候，都要尝试更新一下maxLength。
 *
 * solution2: 动态规划
 * 定义f(i)为以第i个字符结尾的不包含重复字符的子字符串的最长长度。我们从左往右扫描字符串，当我们计算f(i)时，已经知道f(i-1)了，现在来讨论一下状态转移方程。
 * 同样的，要判断字符是否出现过，我们还是需要哈希表来记录“字符-位置“的映射。
 * 当第i个字符在之前没有出现过是，f(i) = f(i-1) + 1;
 * 当第i个字符在之前出现过是，分两种情况：记字符上一次出现的位置到当前位置的距离为d
 *  - 当d > f(i-1)，说明重复字符没有出现在f(i-1)包含的区间中，此时f(i) = f(i-1) + 1;
 *  - 当d <= f(i-1)，说明重复字符就在f(i-1)的区间中，此时我们f(i) = d;
 *  - 当然要注意的是，以上这两种情况，在计算为f(i)之后，都要记得更新哈希表中指定字符的value，更新为最近一次出现的位置
 *
 * 以上两种思路其实基本上是一样的，f(i)其实就是滑动窗口的右边界为第i个字符时窗口的长度，因此二者的写法也是一样的。
 *
 */

/**
 * DP求解
 * @param {*} str 待查找字符串
 * @return {number} 最长不重复子串的长度
 */
function solution(str) {
    if (!str.length) {
        return 0;
    }
    // 为了方便，先把字符串变为字符数组
    const arr = str.split('');
    let maxLength = 0;
    // 哈希表：字符 => 最近出现位置
    const hashmap = {};
    // f(i - 1)
    let currentLength = 0;

    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        // 之前没有出现过该字符
        if (!hashmap.hasOwnProperty(char)) {
            currentLength = currentLength + 1;
        } else {
            const lastPosition = hashmap[char];
            const distance = i - lastPosition;
            // 上一次出现的距离已经大于f(i-1)了
            if (distance > currentLength) {
                currentLength++;
            } else {
                currentLength = distance;
            }
        }
        // 不要忘记更新字符的位置
        hashmap[char] = i;
        maxLength = maxLength >= currentLength ? maxLength : currentLength;
    }

    return maxLength;
}

function testFunc() {
    const str = 'arabcacfr';
    console.log(solution(str));
}
testFunc();