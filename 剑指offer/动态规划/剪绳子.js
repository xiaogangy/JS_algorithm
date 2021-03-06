/**
 * @desc 给你一根长度为n绳子，请把绳子剪成m段（m、n都是整数，n>1并且m>1）。每段的绳子的长度记为k[0]、k[1]、……、k[m]。k[0]*k[1]*…*k[m]可能的最大乘积是多少？
 * 例如当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到最大的乘积18。
 *
 * 思路：动态规划的重点是啥？找状态转移方程！所以我们做如下分析：
 * 首先定义f(n)为把长度为n的绳子剪成若干段后各长度的乘积的最大值，其实也就是目标函数。题目中提到m>1，说明至少要剪一刀，那么“至少”这一刀可以剪在哪里呢？我们有n-1种选择，
 * 也就是剪出来的第一段绳子的长度可能是1，2，3 ……，n-1。剪出来以后，对剩下的两段绳子，我们同样要找到最优的剪法，即f(i)和f(n-i)。因此有f(n) = max(f(i) * f(n-i)),其中
 * 0 < i < n。这就是我们得到状态转移方程(没有加临界点)。
 * 但是这里其实有个trick，就是题目只说了m > 1，也就是最少剪一刀，这说明了在完整的绳子，例如n为8时，我们必须至少要剪一刀。
 * 比如说这一刀剪在长度为4的地方，则把绳子分为了4和4的两个子段，这两个字段是不是需要继续剪呢？我们不得而知，可能需要，也可能不需要，因为对完整的绳子(长度为8)减去一刀后，我们已经满足了
 * m > 1的要求，这时候我们所要做的就是寻找长度为4的子段在为长度为8的总段做贡献时的最大值，这一点在我们下面的代码实现是会体现到。
 * 状态转移方程找到后，我们要找临界点。n是大于1的，我们就从2开始分析。
 * - 当绳子长度为2时，只可能剪成长度都为1的两段，所以f(2) = 1;
 * - 当绳子长度为3时，可以把绳子剪成1，2两段或者1，1，1三段，最大乘积为1*2，所以f(3) = 2;
 * - 当绳子长度为4时，可以分成[1, 2, 1], [2, 2], [1, 1, 1, 1], [1, 3]这些情况，在这些情况里，我们已经可以复用上面求得的f(2)和f(3)了，所以临界点就不用算f(4)了。
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 *
 * @date 2020-7-14
 * 再看这道题，还是觉得非常奇怪，总是说不出来哪里觉得别扭。上面提到f(n)是长度为n的绳子在至少剪一刀之后能获得的子段的最大乘积，并且得出了状态转移方程为
 * f(n) = max(f(i) * f(n - i))。其实仔细抠这个公式是不太对的，因为左边的f(n)表示的是长度为n的绳子至少剪一刀，而右边的子问题，并不是至少剪一刀的情况，
 * 啥意思呢，其实就是上面的trick，长度为i的绳子，f(i)表示的最大值，其实是包含了一刀都不用剪的情况的。也正是这个原因，一直让我觉得很膈应，感觉并不是同一个
 * 问题变成了更小规模，而是换了一些逻辑。所以这也是这道题为啥很少出现递归解法的原因，当然，重在理解这个分解的思想，而不是抠这些所谓的“极限”情况。
 * 或者再准确点说，就是等式左右两边的状态不一致，右边的f(n)表示的是长度为n的绳子至少在剪一刀的情况下的解空间，而右边的f(i)表示的是长度为i的绳子可以在剪任意刀的情况下的
 * 解空间（可以一刀不剪）。
 */


function maxProductAfterCutting(number) {

    // 对一些不能分解为更小的问题，通过分析直接给出结果
    if (number < 2) {
        return 0;
    }
    if (number === 2) {
        return 1;
    }
    if (number === 3) {
        return 2;
    }
    // 动态规划的问题，自底向上解决，我们要先把一些小规模同等问题的解存储起来
    // 注意，这里数组里存的值，并不是直接完全等义的f(i)，而是i作为n的字段，在计算f(n)时能做到的最大的贡献，什么意思呢？
    // 其实就是上面分析时候提到的一种情况，例如我们知道f(3) = 2，但是3作为n = 8时候剪出来的一个字段，它最大的贡献是2吗？显然不是，是3，也就是不剪的情况。为什么会有这种区分呢？
    // 这是题目里面要求了至少要剪一刀，例如长度为8的绳子，减去一刀后，对于剩下的两个字段，我们就没有至少剪一刀的要求了，这个时候在计算f(i)时候，就需要考虑一刀不剪的情况了，然后
    // 看看哪种情况下的贡献最大。
    // storage数组，存储指定长度为i的绳子的f(i)的值（注意上面提到的trick情况）
    const fArr = [0, 1, 2, 3];

    // 外层循环，从小到大计算各个子段的f(i)
    for (let i = 4; i <= number; i++) {
        // @date 2020-7-14 我承认我强迫症犯了，我又在纠结这道题，我的纠结点是fArr这个storage数组，存的是长度i的绳子作为子段时所能做到的最大贡献，那么在自底向上解决问题的时候，应该考虑到
        // 子段一刀都不切的情况。啥意思呢？也就是说，如果在填充fArr[j] (j < i) 的时候，这个时候j肯定是作为i的子段的，那么其实它可以一刀都不剪的，所以要将长度j(一刀不剪)也和各种剪的情况进行比较。
        // 但是下面的算法，你会发现都没有对“一刀没剪”这种情况进行判断，其实基于一个数学常识，当绳子长度大于等于4的的时候，剪一刀所得到的所有情况的最大值肯定比一刀不剪的值大。
        // @date 2020-8-12 注意这里思考的时候，结合DP的无后效性，也就是前面算出来f(i)的情况下，再算f(i+1)的时候，我已经不考虑f(i)怎么算出来的情况了。
        let max = 0;
        // 以number=4为例，这里其实就是计算f(0)*f(4), f(1)*f(3), f(2)*f(2)的最大值
        for (let j = 1; j <= Math.floor(i / 2); j++) {
            max = Math.max(max, fArr[j] * fArr[i - j]);
        }
        fArr[i] = max;
    }

    return fArr[number];
}

function testFunc() {
    const testArray = [1, 2, 3, 5, 8, 12];
    testArray.forEach(number => {
        console.log(maxProductAfterCutting(number));
    });
}
testFunc();