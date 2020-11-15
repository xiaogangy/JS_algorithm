/**
 * @description 给出一个整数，从该整数中去掉K个数字，要求剩下的数字形成的新整数尽可能小，应该如何选取被去掉的数字？
 * 什么意思呢？举个栗子，给出一个整数1593212，要求删除3个数以后，剩下的数最小，则删除593，剩下的数为1212，最下
 * 再比如一个整数为30200，删去一个数字，新整数最下的情况是200；给出一个整数10，删去2个数字，最小情况为0。
 *
 * 思路：遇到这种问题，如果第一反应是毫无思路，有两种方法可以选择。
 * 方法一：从实际的例子中寻找规律，例如从上面的几个示例中寻找规律，会发现好像删掉的都是高位的一些较大的数字，但是没有具体的规律……
 * 方法二：简化问题，从子问题出发。比如本题，如果只删除1个数字，如何让新整数尽可能的小？
 * 我们可以发现，数字的大小虽然重要，但是位数貌似更重要，高位去掉一个大数，新整数影响会更大。比如一个整数541270936，删除1位数字？
 * 无论删除哪一位，都是从9位数变为8位数，这时候让高位数字降低，显然对新整数的影响更大，比如删掉5，剩下的8位数字的最高位迅速变为4，如果不删除5，删除其余任意的数字，
 * 最高位仍然是5，显然不如删掉5的情况。
 * 那么如何把高位降低呢？规律很简单：把原整数的所有数字从左到右比较，如果发现某位数字大于它右边的数字，那么在删除该数字后，必然会使该数位的值降低，因为右边比它小的数字顶替了他的位置。
 * 这只是删除1位的情况，那么如果是删除k位呢？如果按照如上的规律每次都删除1位，那么是否剩下的数字就是最小的呢？看看上面的示例，会发现这个方法是成立的。
 * 这就引申出了一个重要的算法！！
 * 像这种通过每次求一个局部最优解，最终得到全局最优解的情况，叫做贪心算法
 *
 * solution：
 * - 从左到右遍历这个新整数，遍历到某个数字，发现它比右边的数字大的话，就把这位删掉，然后k值减小1位
 * - 继续进行上一步的迭代，直到k值减为0，得到的数字即为最小值
 */

// 版本1：未优化版本
function removeKDigits(number, k) {

    // 1. 遍历number，找到逆序的数字，然后剔除
    // 为了方便操作，先将number转为数组
    const arr = String(number).split('').map(digit => parseInt(digit, 10));
    if (arr.length < k) {
        throw new Error('删除的位数过多');
    }

    // 双重循环，外层控制删除的个数，内层遍历数组
    for (let i = k; i > 0; i--) {
        // 用于标识是否找到了一个逆序的数字
        let hasCut = false;
        // 遍历数组，删除逆序的数字
        for (let j = 0; j < arr.length - 1; j++) {
            let current = arr[j];
            let next = arr[j + 1];
            if (current >= next) {
                arr.splice(j, 1);
                hasCut = true;
                break;
            }
        }
        // 如果没有找到要删除的数字，即当前整数为完全顺序的，删除最后一位即可
        if (!hasCut) {
            arr.pop();
        }
    }

    // 2. 将数组中的数重新整理成整数
    const str = arr.join('');
    const ret = str ? parseInt(str, 10) : 0;
    return ret;

}

/**
 * 上面的代码用了双层循环，外层循环的量为k，内层循环的量为n，时间复杂度为O(kn)。
 * 但是其实有很多优化的空间，比如内层循环每次都从第一位开始遍历，其实是没必要的，因为上一次循环前面这些位置已经都比较过了，应该保存上一次删除元素的位置，
 * 从这个元素开始下一次的遍历，实现办法是在外层循环里保存一个变量，用来记录下一次开始内循环的起始位置。
 * 当然，还可以调整思路，用一种最简便的方法，遍历一次数组就可以实现效果，这种怎么实现呢？
 * 可以通过将数组作为外循环，k作为内循环来实现，具体操作实现过程如下：
 */

// 版本2：优化版本
function optRemoveKDigits(number, k) {

    const arr = String(number).split('').map(digit => parseInt(digit, 10));
    const length = arr.length;
    if (arr.length < k) {
        throw new Error('删除的位数过多');
    }

    // 1. 遍历数组，不断的与栈顶元素做比较
    const stackLength = length - k;
    const stack = [];
    for (let i = 0; i < length; i++) {
        const current = arr[i];
        // 这里要特别注意！！！
        // 当栈顶数字大于遍历到的当前数字时，栈顶数字出栈（相当于删除数字），这里要用while loop，因为可能栈内可能连续多个数都比当前元素大
        while (stack.length && stack[stack.length - 1] >= current && k > 0) {
            stack.pop();
            k--;
        }
        // 如果栈中的元素的个数已经达标，就不要再入栈了，后面的元素就被砍掉了，这种情况主要是考虑全顺序的数组
        if (stack.length < stackLength) {
            stack.push(current);
        }
    }

     // 2. 将数组中的数重新整理成整数
    const str = stack.join('');
    const ret = str ? parseInt(str, 10) : 0;
    return ret;

}


function testFunc() {
    console.log(removeKDigits(1593212, 3));
    console.log(optRemoveKDigits(1593212, 3));
    console.log(removeKDigits(30200, 1));
    console.log(optRemoveKDigits(30200, 1));
    console.log(removeKDigits(10, 2));
    console.log(optRemoveKDigits(10, 2));
    console.log(removeKDigits(541270936, 3));
    console.log(optRemoveKDigits(541270936, 3));
    console.log(removeKDigits(15531, 1));
    console.log(optRemoveKDigits(15531, 1));
    console.log(removeKDigits(123456, 1));
    console.log(optRemoveKDigits(123456, 1));
    console.log(removeKDigits(28942, 2));
    console.log(optRemoveKDigits(28942, 2));
}

testFunc();