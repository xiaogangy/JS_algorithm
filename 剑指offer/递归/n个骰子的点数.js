/**
 * @desc 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
 *
 * solution1: 递归法
 * 这道题递归的思路很好找，要找n个骰子的点数和概率，其实就是要找出n个骰子扔出去的所有情况。那么递归就很明显了，每个骰子都是一个独立随机事件，互不影响的。
 * n个骰子扔出去的情况 = 第一个骰子的情况 * （n-1）个骰子的情况。换成点数和，我们要求n个骰子扔出去的点数和，就等于第一个骰子的点数 + n-1个骰子的点数和。
 * 我们知道骰子有6个面，所以n个骰子的点数和分布在[n, 6n]之间。我们可以声明一个长度为6n-n+1的数组arr，用来保存所有可能出现的点数和情况，数组的索引要加一个偏移量n，
 * 例如index为0的元素实际上表示的是点数和为n的情况，数组中元素的值是当前这个和出现的次数，也就是说和为s的情况保存在第s-n个元素里。
 * 得到这个次数数组后，我们知道n个骰子总共可能出现的情况有6^n种，用arr中的每个值去除以总情况数，就可以得到概率分布。
 *
 * solution2: 基于循环求骰子点数
 * 我们可以换一种思路来解决这个问题。我们可以考虑用两个数组来存储每种骰子点数和出现的次数。在一轮循环中（即扔一个新的骰子，我们还是考虑一个一个的扔），第一个数组中的
 * 第n个数字表示骰子和为n出现的次数。在下一轮循环中，我们加上一个新的骰子，此时和为n的情况应该等于上一轮循环中骰子点数和为n-1, n-2, n-3, n-4, n-5与n-6的次数的
 * 总和，所以我们把另外一个数组的第n个数字设为前一个数组对应的第n-1、n-2、n-3、n-4、n-5、n-6个数字之和。简单记一个公式就是:
 * 新的f(n) = 旧的f(n-1) + f(n-2) + f(n-3) + f(n-4) + f(n-5) + f(n-6)
 * 但是这里有一个注意项：并不是每个f(n)都等于其他6个值的和，比如如果只有3个骰子，你在更新和为3的情况时，就不应该 + f(n-4) + f(n-5) + f(n-6)，这一点会在下面代码
 * 中体现到。
 */

/**
 * n个骰子所有可能出现的点数和概率
 * @param {*} n 骰子个数
 * @return {Array} 点数和概率数组
 */
function solution1(n) {
    // 健壮性
    if (n < 1) {
        return {};
    }
    // 1. 声明概率数组
    const probabilities = new Array(5 * n + 1).fill(0);
    // 2. 递归去填充这个概率数组
    calculate(n, 1, 0, probabilities);
    // 3. 开始计算概率
    const result = {};
    for (let i = 0; i < probabilities.length; i++) {
        const sum = n + i;
        const probability = probabilities[i] / (Math.pow(6, n));
        result[sum] = probability;
    }

    // 以下代码仅用作测试
    // let test = 0;
    // Object.keys(result).forEach(key => {
    //     test += result[key];
    // });
    // console.log('概率和', test);

    return result;
}

/**
 * 求扔n个骰子可以出现的点数和情况，并更新概率
 * 写递归一定要注意这一点：在写函数之前要明确你这个函数是干啥的
 * 
 * @param {*} number 总共有几个骰子
 * @param {*} step 当前要扔第几个骰子
 * @param {*} currentSum 之前骰子构成的点数和
 * @param {*} probabilities 概率数组
 */
function calculate(number, step, currentSum, probabilities) {
    // 递归出口：如果当前要扔的骰子已经超过了总骰子数，说明所有的骰子都已经扔完了，此时要停了，还要更新点数和出现的次数
    if (step > number) {
        probabilities[currentSum - number]++;
        return;
    }
    // 如果还有骰子没有扔完，就先更新当前得到的点数和，然后递归计算剩下骰子可以得到的点数和
    for (let i = 1; i <= 6; i++) {
        calculate(number, step + 1, currentSum + i, probabilities);
    }
}

// -----------------------------------------华丽的分割线------------------------------------------- //

function solution2(n) {
    // 老规矩：先保证健壮性
    if (n < 1) {
        return {};
    }

    // 1. 先声明两个数组，交替更新，数组长度和多了1，是为了便于理解，例如和为1的次数就放在下标为1的位置
    const probabilities1 = new Array(6 * n + 1).fill(0);
    const probabilities2 = new Array(6 * n + 1).fill(0);
    const probabilities = [probabilities1, probabilities2];
    let flag = 0; // 控制当前修改的概率数组

    // 2. 先初始化第一个数组，单独拆出来显得清晰
    for (let i = 1; i <= 6; i++) {
        probabilities[flag][i] = 1;
    }

    // 3. 开始交替更新，循环的控制条件是把所有的骰子都扔完.
    // k表示在扔第几个骰子
    for (let k = 2; k <= n; k++) {

        for (let i = 0; i < k; i++) {
            // 这里的意思是：有k个骰子，自然点数和不可能小于k，也就是小于k的数组元素全部要清0。
            // 这一步是非常有必要的，因为后续更新和为n的次数，如果没有做这一步清0，得到的次数会变多，这里也跟下面的那个j <= i条件有点类似
            probabilities[1 - flag][i] = 0;
        }

        // 要更新另外一个概率数组的次数
        // i表示的加入了新的骰子后，当前所有这些骰子可以得到的点数和，显然是[k, 6k]
        for (let i = k; i <= 6 * k; i++) {
            // 先把当前可能出现的次数清零
            probabilities[1 - flag][i] = 0;

            // 更新方法：新的f(n) = 旧的f(n-1) + f(n-2) + f(n-3) + f(n-4) + f(n-5) + f(n-6)
            // 解析里强调的注意的地方就是这里了：j <= i，不仅是为了防止数组越界得不到值，也是符合真实意义，比如当前就2个骰子，要求和为2出现的情况，自然只有可能是
            // f(2) = f(1) + f(0)这两种情况
            for (let j = 1; j <= i && j <= 6; j++) {
                probabilities[1 - flag][i] += probabilities[flag][i - j]
            }
        }
        flag = 1 - flag;
    }

    // 4. 计算概率
    // 注意：此时最新的概率情况保存在flag值的数组中
    const result = {};
    for (let i = n; i < probabilities[flag].length; i++) {
        const probability = probabilities[flag][i] / (Math.pow(6, n));
        result[i] = probability;
    }

    // 以下代码仅用作测试
    // let test = 0;
    // Object.keys(result).forEach(key => {
    //     test += result[key];
    // });
    // console.log('概率和', test);

    return result;
}

function testFunc() {
    const n = 3;
    // console.log(solution1(n));
    console.log(solution2(n));
}
testFunc();