/**
 * @file 单词拆分(leetcode 140.)
 */

function getSamePrefixArray(s, wordDict) {
    const result = [];
    for (let word of wordDict) {
        // const length = word.length;
        if (s.startsWith(word)) {
            result.push(word);
        }
    }
    return result;
}

// 回溯方法
function core(s, wordDict, array, result) {
    if (!s) {
        result.push(array.join(' '));
        return;
    }
    // 匹配的前缀
    const prefixes = getSamePrefixArray(s, wordDict);
    if (!prefixes.length) {
        return;
    }
    for (let word of prefixes) {
        array.push(word);
        core(s.substring(word.length), wordDict, array, result);
        array.pop(word);
    }
}

function wordBreak(s, wordDict) {
    if (!wordDict.length || !s) {
        return [];
    }
    // const map = {};
    const result = [];
    const array = [];
    core(s, wordDict, array, result);
    return result;
}

function testFunc() {
    const s = 'pineapplepenapple';
    const wordDict = ['apple', 'pen', 'applepen', 'pine', 'pineapple'];
    console.log(wordBreak(s, wordDict));
}

testFunc();