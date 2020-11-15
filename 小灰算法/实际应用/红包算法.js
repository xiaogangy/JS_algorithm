/**
 * @description 要在一个群里发红包，有如下规则要求
 * 1. 所有人抢到的金额之和要等于红包金额，不能多也不能少
 * 2. 每个人至少抢到1分钱
 * 3. 要保证红包拆分的金额尽可能分布均匀，不要出现两极分化太严重的情况
 */

/**
 * solution1: 常规做法，每次拆分的金额 = random[1分，剩余金额 - 1分]
 * 这种方法有个致命问题，那就是越靠前的人越容易抽到大的红包，红包分布会非常不均匀。例如5个人分100块钱分包
 * 第一个人会在[1, 9999]之间随机取值，中位数为5000，即第一个红包的金额大小为50；如果第一个人抢了50块钱，同理，
 * 第二个人红包的金额为25，以此类推，越靠后的人拿到的钱越少
 */


// 以下为可行的方法
/**
 * solution2: 二倍均值法。为了保证平衡，把每次随机金额的上限定为剩余人均金额的2倍。具体规则如下：
 * 假设剩余红包金额为m元，剩余人数为n，那么有如下公式：
 *      每次抢到的金额 = random[0.01，m/n * 2 - 0.01];
 * 这个公式保证了每次随机金额的平均值是相等的，不会因为抢红包的先后顺序而造成不公平。
 * 举个例子，还是5个人分100块钱：
 * 第一个人取随机数的区间为[0.01, 39.99]，中位数为20
 * 第二个人同理，也是20
 */
function divideRedPackage(totalAmount, totalPeopleNum) {
    const result = [];
    let restAmount = totalAmount;
    let restPeopleAmount = totalPeopleNum;

    for (let i = 1; i < totalPeopleNum; i++) {
        // 获取[1, 剩余金额/剩余人数 * 2 - 1]之间的随机数
        const left = 1;
        const right = restAmount / restPeopleAmount * 2 - 1;
        // 获取的红包以分为单位
        const number = parseInt(Math.random() * (right - left + 1) + left, 10);
        restAmount -= number;
        restPeopleAmount = restPeopleAmount - 1;
        result.push(number);
    }
    // 只剩下最后一个人时，直接把剩余的钱给他
    result.push(restAmount);
    return result;
}

/**
 * solution3: 切割线段法
 * 把红包金额想成一条很长的线段，而每个人抢到的红包金额为这条主线段所拆分出来的若干子线段。那么如何定义每个子线段的长度呢？
 * 当n个人抢总金额为m的红包时，需要n-1个切割点，我们做n-1次random[1, m - 1]运算，得到n-1个切割点，自然的，每个子线段的长度也就确定了
 * 需要注意，如果出现切割点重复时，如何处理？我们在这里，直接再random一次即可
 */
function solution3(totalAmount, totalPeopleNum) {
    const left = 1;
    const right = totalAmount - 1;
    const separator = [];
    // n个用户，需要n-1个切割点
    for (let i = 1; i < totalPeopleNum; i++) {
        let number = parseInt(Math.random() * (right - left + 1) + left, 10);
        // 出现重复，重新进行计算
        while (separator.includes(number)) {
            number = parseInt(Math.random() * (right - left + 1) + left, 10);
        }
        separator.push(number);
    }
    separator.sort((a, b) => a - b);
    separator.unshift(0);
    separator.push(totalAmount);

    const result = [];
    for (let j = 1; j < separator.length; j++) {
        const number = separator[j] - separator[j - 1];
        result.push(number);
    }
    return result;
}

function testFunc() {
    const ret = solution3(10000, 5);
    console.log(ret);
    console.log(ret.reduce((a, b) => a + b));
}

testFunc();