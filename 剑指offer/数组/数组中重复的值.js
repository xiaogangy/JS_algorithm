/**
 * @file 数组中重复的值
 */

// 1. 找出数组中重复的数字（允许修改数组）
// 在一个长度为n的数组中所有的数字都在0~n-1之间，数组中某些数字是重复的，但是不知道哪些数字是重复的，也不知道哪个数字重复了几次。
// 请找出数组中任意一个重复的数字。

/**
 * 解法1：哈希表
 * @param {*} numbers 数组
 * @param {*} duplication 把重复的值，放到duplication[0]中
 */
function duplicate(numbers, duplication) {
    // 注意代码健壮性
    if (!numbers || !numbers.length) {
        return false;
    }
    const length = numbers.length;
    for (let i = 0; i < length; i++) {
        if (numbers[i] < 0 || numbers[i] > length - 1) {
            return false;
        }
    }

    const hashTable = {};
    for (let i = 0; i < length; i++) {
        const current = numbers[i];
        if (hashTable[current]) {
            duplication[0] = current;
            return true;
        }
        hashTable[current] = true;
    }
    // 走到这儿，说明肯定没找到，直接返回false
    return false;
}

/**
 * 解法2：哈希表虽然可以实现在O(N)时间内解决问题，但是空间复杂度也变成了o(n)，而且也没有充分利用到题目中的第一个条件，即
 * n个数字都在0~n-1之间。那么我们换种思路来看这道题，n个数字都在0~n-1之间，这个说明了什么呢？如果没有重复的话，那么每个数
 * 会刚刚好落在数组中与其大小相等的索引位置处，如果有重复的话，那么肯定在某个位置处，会有冲突。我们利用这个思路来解一下这个题：
 * 1. 从数组中的第一个元素开始，判断当前位置的值是不是和其索引值相等，即value和index是不是相等
 * 2. 如果相等，那么开始判断数组中的下一个元素。
 * 3. 如果不相等呢？我们就把这个位置处的值，放到其应该在的位置，也就是索引值也等于这个值的位置；这个时候，如果目标位置的值和
 * 这个待放置的值相等，我们就知道有遇到重复的值了，这时候返回这个值就行。
 * 如果没有冲突呢，别急，先把这个待放置的值放过去，然后把原先那个位置的值拿回来，然后再继续判断当前这个位置的值是否和当前位置的
 * 索引是否相等。
 * 4. 重复这个操作，直到数组完全遍历完，或者中间遇到了重复的值
 */
function duplicate2(numbers, duplication) {
    if (!numbers || !numbers.length) {
        return false;
    }
    const length = numbers.length;
    for (let i = 0; i < length; i++) {
        if (numbers[i] < 0 || numbers[i] > length - 1) {
            return false;
        }
    }

    for (let i = 0; i < length;) {
        const currentValue = numbers[i];
        // 1. 当前位置的值和索引值相等
        if (currentValue === i) {
            i++;
            continue;
        }
        // 2. 当前位置的值和索引值不等，要把当前位置的值，放到其应该在的位置上去
        const targetPositionVal = numbers[currentValue];
        if (targetPositionVal === currentValue) {
            duplication[0] = currentValue;
            return true;
        } else {
            const temp = targetPositionVal;
            numbers[currentValue] = currentValue;
            numbers[i] = temp;
        }
    }
    return false;
}

// 题目2：不修改数组找出重复的数字
// 在一个长度为n+1的数组里的所有数字都在1~n的范围内，所以数组中至少存在一个数字是重复的。请找出数组中任意一个重复的数字，
// 但是！不能修改输入的数组
/**
 * 解法1：哈希表，时间复杂度o(n)，空间复杂度o(n)
 * 解法2：找规律。什么意思呢？因为有n+1个数字，但是数字范围仅在1~n内，所以必然出现了重复数字。我们能不能把这个范围缩小一点呢？
 * 我们可以尝试把这个1~n这个序列一分为二，比如根据m这个值来划分序列，那么形成1~m和m+1~n的两段大小区间。这时候，我们可以统计数组
 * 中值位于1~m区间的数字，如果得到的个数大于m个，那么肯定重复的数组出现在1~m之间！（你想啊，如果1~m之间的每个数字不重复且都出现，
 * 也才m的长度，你现在这个区间大于m了，肯定有重复的值了啊）。相应的，如果得到的个数小于或者等于m个，那么重复数字一定出现在m+1~n
 * 这个序列区间里。这时候，我们就要缩小序列的查找范围，把之前的序列区间再缩小……缩小……直到……这个序列区间长度为1了，但是发现count
 * 大于1了，那么很显然，重复值出现了！
 * 时间复杂度，二分拆分o(logn)，但是你每次都要遍历一遍数组统计count啊，所以最终的时间复杂度是o(nlogn)，太垃圾了。理解思路就好
 */