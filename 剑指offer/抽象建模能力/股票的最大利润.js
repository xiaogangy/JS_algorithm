/**
 * @desc 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？例如，一只股票在某些时间节点的价格是{9, 11, 8, 5, 7, 12, 16, 14}。
 * 如果我们能在价格为5的时候买入并在价格为16时卖出，则能收获最大的利润为11。
 *
 * 思路1：暴力求解
 * 最直观的办法是我们每次选中一个值作为买入价格，然后依次将其后的元素作为卖出价格，然后计算利润，从而得到最大利润。这种方法的时间复杂度是O(n^2).
 *
 * 思路2：指定卖出价
 * 在上面的思路中，我们每次遍历一个元素是把其当做买入价格，这一次我们把遍历得到的价格当做卖出价格，这样的优势是当遍历到这个元素的时候，前面所有的元素都已经遍历过了，当然最低买入价格
 * 也就知道了。这样简单的一转换，时间复杂度就立马从O(n^2)变为O(n).
 *
 */

function solution(numbers) {
    // 健壮性：至少得有两个元素
    if (numbers.length < 2) {
        return null;
    }

    let min = numbers[0];
    let maxDiff = numbers[1] - min;
    for (let i = 2; i < numbers.length; i++) {
        // 如果前一个值还小于min，说明min值应该更新了
        if (numbers[i - 1] < min) {
            min = numbers[i - 1];
        }

        const diff = numbers[i] - min;
        if (diff > maxDiff) {
            maxDiff = diff;
        }
    }

    return maxDiff;
}

function testFunc() {
    const numbers = [9, 11, 8, 5, 7, 12, 16, 14];
    console.log(solution(numbers));
}
testFunc();