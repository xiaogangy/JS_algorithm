/**
 * @desc 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2~10为数字本身，A为1，J为11，Q为12，K为13，而大王、小王可以看成任意数字。
 *
 * solution：这道题比较简单，我们要判断5张牌是不是顺子，就是就是判断排序后的5张牌是不是连续，把大王小王当做0，具体的做法如下：
 * - 先对5张牌排序，排序算法随便用，就5张牌而已
 * - 统计数组中0的个数，因为0可以充当任何其他数字
 * - 统计非0数字的间隔，如果间隔数少于0的个数，就可以拼成一个顺子
 * - 注意：如果数组中有重复的非0数字，则数组不可能是连续的，因为这是一个对子
 */

/**
 * 判断数组能不能构成一个顺子
 * @param {*} numbers 数组
 * @return {boolean} 是否构成了顺子
 */
function isContinuous(numbers) {
    // 健壮性判断
    if (numbers.length < 1) {
        return false;
    }

    // 1. 先排序
    numbers.sort((a, b) => a - b);

    // 2. 统计0的个数，也就是可变的数字个数
    let numOf0 = 0;
    let i = 0;
    while (numbers[i] === 0) {
        numOf0++;
        i++;
    }

    // 3. 统计空缺个数（不需要统计第一个非0值和0之前的差值）
    let numOfEmpty = 0;
    let prev = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
        const current = numbers[j];
        // 如果当前值和前一个值相同，直接返回false
        if (current === prev) {
            return false;
        }
        // 否则统计差值个数
        const diff = current - prev - 1;
        numOfEmpty += diff;
        // 更新prev
        prev = current;
    }

    // 4. 判断0的个数和空缺个数
    return numOf0 >= numOfEmpty;
}

function testFunc() {
    const numbers = [10, 11, 12, 9, 8];
    console.log(isContinuous(numbers));
}
testFunc();