/**
 * @desc 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 *
 * 思路：我们把长度为n的大矩形的覆盖方法记为f(n)，用第一个小矩形去覆盖大矩形的最左边时，有两种选择，可以横着放，也可以竖着放，这样会产生两种结果。
 * - 当横着放的时候，第二行最左边也必须同样放一个小矩形，这时候剩余的大矩形为2*(n-2)，因此问题转化为求f(n-2)；
 * - 当竖着放时，剩余大矩形为2*(n-1)，问题转化为求f(n-1)。
 * 因此我们可以得到一个公式，f(n) = f(n-1) + f(n-2)。这个公式如此熟悉，就是斐波那契数列，只不过我们还是要考虑临界条件。
 * - 当n为0时，f(0) = 0;
 * - 当n为1时，f(1) = 1，这时候只有一种放置方法，就是竖着放；
 * - 当n为2时，f(2) = 2，因为只能放两个小矩形，所以是要么都横着放，要么都竖着放
 */

function rectCover(number) {
    if (number === 0) {
        return 0;
    }
    if (number === 1) {
        return 1;
    }
    if (number === 2) {
        return 2;
    }

    let first = 1;
    let second = 2;
    let current = 0;
    for (let i = 3; i <= number; i++) {
        current = first + second;
        first = second;
        second = current;
    }
    return current;
}