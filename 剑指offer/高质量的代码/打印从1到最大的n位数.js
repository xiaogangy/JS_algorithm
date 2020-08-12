/**
 * @desc 输入数字n，按顺序打印出从1到最大的n位十进制数。比如输入3，则打印出1、2、3一直到最大的3位数999；
 *
 * 思路：看到这道题，不要贸然下手写代码，这道题的坑就在这里，输出n位的整数，不如我们先说一下JS中可以表示的最大安全整数
 * Number.MAX_SAFE_INTEGER = 9007199254740991，总共是16位，这才是n等于16的情况，也就是说我们用JS的number来表示，最大也就表示到n为15的情况。
 * 这显然是不够的，所以这道题其实是考的大数的运算，因为number越界后是不准确，用string或者数组表示大数才是安全可行的方案。
 *
 * 这道题总共有两种解决方案，我们分开讨论并实现一下，当然我们都是用的数组来描述的大数
 * 方法1：数组中的每一位保存一个digit上的数字，然后不断的加1，然后输出，直到最高位产生进位，说明这个时候n位所有的digit都是9了
 * 方法2：递归。这道题其实是n个位置，每个位置可选数字为0~9的全排列，所以我们可以用递归来实现一下。
*/

/**
 * 解法1：用数组做大数加法，更加具体的分析查看目录小灰算法中的”大整数的加法“。
 * 主要做两件事：
 * 1. 在数组表示的大数上做加法
 * 2. 把数组表示的大数打印出来
 *
 * @param {*} n 最大位数
 */
function solution1(n) {

    // 先声明一个长度为n+1的数组（最高位会产生进位），逆序存储大整数（更符合我们对数组的操作）
    const arrNumber = new Array(n + 1).fill(0);

    // 开始不断加1，如果合法就把它输出
    while (increment(arrNumber)) {
        printResult(arrNumber);
    }
}

/**
 * 为了逻辑清晰，把自增1的操作抽离出来
 * @param {*} arrNumber 待自增1的数组大数
 * @return {boolean} 返回一个本次加1操作是否合法的标识
 */
function increment(arrNumber) {
    // 数组整数的总位数，注意比真实长度多一位，为了判断最高位进位用的
    const length = arrNumber.length;

    // 先判断一下这次是不是还要加1，或者说这次加1还合法不
    let needIncrement = false;
    for (let t = length - 2; t >= 0; t--) {
        if (arrNumber[t] === 9) {
            continue;
        } else {
            needIncrement = true;
            break;
        }
    }
    // 1. 不应该再加1了，会超过范围，直接返回false，不修改输入值
    if (!needIncrement) {
        return false;
    }

    // 2. 还可以加1，修改输入值arrNumber
    let carry = 0; // 保存进位
    for (let i = 0; i < length - 1; i++) {
        let current = arrNumber[i] + carry;

        // 只在最低位加1
        if (i === 0) {
            current++;
        }

        // 如果产生了进位
        if (current >= 10) {
            current = current - 10;
            carry = 1;
            arrNumber[i] = current;
        } else {
            // 没有产生进位
            arrNumber[i] = current;
            carry = 0;
            // 因为没有产生进位，后面自然也不需要再计算了
            break;
        }
    }

    return true;
}

/**
 * 把数组大整数规范化成字符串，然后输出一下
 * @param {*} arrNumber 待打印数字
 */
function printResult(arrNumber) {
    const length = arrNumber.length;

    let lastZeroIndex = length - 1;
    // 逆序找第一个非零值
    while (!arrNumber[lastZeroIndex]) {
        lastZeroIndex--;
    }

    const value = arrNumber.slice(0, lastZeroIndex + 1).reverse().join('');
    console.log(value);
}


/**
 * 解法2：利用递归
 * 分析一下，我们在第一位（最高位），可以填充0~9的每个数值，填充完之后就是第二位……
 * 后续的操作和前面一模一样，只是输入值规模变小了，所以可以用递归来解决问题。
 *
 * @param {*} n 最大位数
 */
function solution2(n) {

    // 声明数组存储各位，这次就不要长度多加1了，因为没有进位一说
    const arrNumber = new Array(n).fill(0);

    for (let i = 0; i <= 9; i++) {
        arrNumber[0] = i;
        recursive(arrNumber, n, 1);
    }
}

/**
 * 写递归前要想清楚哪些部分可以放在递归函数里，这里我们抽象的是把当前位循环0~9之后，后面位的填充是相同的逻辑，所以这是一个递归函数。
 * 然后判断递归函数要哪些参数？我们需要不断地填充每一位，所以前面位的值当然要知道，所以arrNumber必须要；什么时候终结这个递归呢？当我们填充完最后一位，
 * 也就是最低位之后，就要停止递归，这说明我们还需要数组总长度length，也就是n和当前正在填充位的index。
 *
 * @param {*} arrNumber 待填充数组整数
 * @param {*} length 数组总长度
 * @param {*} index 当前正在填充的位index
 */
function recursive(arrNumber, length, index) {

    // 递归终止条件，当填充位数到达最后一位的下一位时，递归结束
    if (index === length) {
        // 直接输出当前得到的数组整数
        recursivePrint(arrNumber);
        return;
    }

    for (let i = 0; i <= 9; i++) {
        arrNumber[index] = i;
        recursive(arrNumber, length, index + 1);
    }
}

function recursivePrint(arrNumber) {
    const length = arrNumber.length;
    let firstNonZeroIndex = 0;

    while (firstNonZeroIndex < length && !arrNumber[firstNonZeroIndex]) {
        firstNonZeroIndex++;
    }

    const value = arrNumber.slice(firstNonZeroIndex).join('');
    console.log(value);
}

function testFunc() {
    const n = 3;
    solution1(n);
    solution2(n);
}
testFunc();
