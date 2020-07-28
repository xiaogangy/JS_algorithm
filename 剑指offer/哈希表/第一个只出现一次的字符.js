/**
 * @desc 题目一：在字符串中找出第一个只出现一次的字符。如输入'abaccdeff'，则输出'b'。
 *
 * 模式：对于需要判断过个字符是否在某个字符串中出现过，或者统计它们出现的此时，第一反应是想到哈希表。JS中的对象就是一个哈希表，map对象也是，但是JS对象中的key并不是有序的，
 * map是有序的。如果涉及到有序的问题，可以考虑自己DIY一个简易哈希表，我们知道ASCII码总共是128个，我们可以声明一个长度为256的数组(C++中的char是8位的)，使用字符的ASCII码
 * 作为数组的key值，value为字符出现的次数 or other things.
 *
 * solution: 回归到本题。我们可以使用扫描两边字符串的办法来解决。
 * - 第一遍扫描的时候，把出现的字符都存在哈希表中，同时更新字符的出现次数
 * - 第二遍再从头开始扫描字符串，遇到的第一个出现次数为1的字符，即为结果
 */

function solution(str) {
    // 字符串为空，自然没有第一个出现的字符
    if (!str.length) {
        return -1;
    }
    const arr = str.split('');
    const hashMap = {};

    // 第一遍扫描，统计各个字符出现的次数
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        if (hashMap[char]) {
            hashMap[char]++;
        } else {
            hashMap[char] = 1;
        }
    }
    // 第二遍扫描，边扫描数组，边查看哈希表，找第一个为1的字符
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        if (hashMap[char] === 1) {
            return i;
        }
    }

    return -1;
}

/**
 * @desc 题目二：字符流中第一个只出现一次的字符。请实现一个函数，用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符'go'时，第一个只出现
 * 一次的字符是'g'；当从该字符流中读出前6个字符'google'时，第一个只出现一次的字符是'l'。
 *
 * solution：首先我们需要明确的是，我们仍然使用哈希表来解决，但是我们这次存储的是字符 => 位置的映射，具体的步骤为：
 * - 每次从数据流中读出一个字符，然后更新哈希表。如果哈希表中之前没有这个字符，则把字符 => 第一次出现的位置存储起来；如果之前已经出现过，则将该字符的value更新为一个特殊值，
 * 比如更新为-2，表示这个字符已经重复出现了。
 * - 遍历哈希表，找到位置大于等于0且值最小的字符（即最接近0的字符），即为第一个只出现一次从字符。
 */

// 哈希表
const hashmap = {};
let index = 0;

/**
 * 从数据流中读取字符
 * @param {*} char 读取的字符
 * @param {number} index 新加入的字符的位置
 */
function insert(char) {
    if (hashmap.hasOwnProperty(char)) {
        // 哈希表中已经有了该字符，说明该字符已经重复了，直接置为-2
        hashmap[char] = -2;
    } else {
        // 哈希表中还没出现，置为该字符出现的位置
        hashmap[char] = index;
    }
    index++;
}

/**
 * 得到第一个出现一次的字符
 *
 * @return {number} 位置
 */
function getFirstChar() {
    let min = Number.MAX_VALUE;
    let ret = '#';
    Object.keys(hashmap).forEach(key => {
        const value = hashmap[key];
        if (value >= 0 && value < min) {
            min = value;
            ret = key;
        }
    });
    return ret;
}

function testFunc() {
    // const str = 'abaccdeff';
    // console.log(solution(str));
    'helloworld'.split('').forEach((char) => {
        insert(char);
        console.log(getFirstChar());
    });
    console.log(hashmap);
}
testFunc();