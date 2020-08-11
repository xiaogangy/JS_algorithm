/**
 * @desc 假设在一个单调递增的数组里的每个元素都是整数并且是唯一的。请找出数组中任意一个数值等于其下标的元素。例如，在数组[-3, -1, 1, 3, 5]中，数字3和它的下标相等。
 *
 * solution：二分查找
 * 这道题和在0~n-1中寻找缺失的整数十分相似，也是用二分查找来降低时间复杂度。假设我们已经找到了一个下标为i，值为m的元素，如果i等于m，自然直接返回；如果i < m呢，我们
 * 可以知道如果继续往右边找，仍然是 i' < m'的，所以这时候应该找左边；同理，如果i > m, 左边的仍然是 i' > m'，我们应该找右边的元素。
 */

function solution(data) {
    const length = data.length;
    if (!length) {
        return -1;
    }

    let start = 0;
    let end = length - 1;

    while (start <= end) {
        let middleIndex = end + (end - start) >> 1;
        let middleValue = data[middleIndex];

        if (middleValue === middleIndex) {
            return middleValue;
        } else if (middleIndex < middleValue) {
            end = middleIndex - 1;
        } else {
            start = middleIndex + 1;
        }
    }

    return -1;
}

function testFunc() {
    const numbers = [-3, -1, 1, 3, 5];
    console.log(solution(numbers));
}
testFunc();