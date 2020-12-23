/**
 * @desc 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 *
 * 考点：对时间复杂度的优化
 * solution1：哈希表
 * 一旦涉及到次数问题，第一反应就要想到哈希表这种数据结构，我们用元素作为key，次数作为value，遍历一遍数组，就可以知道找到要求的数字。
 * 时间复杂度是0(N)，当然空间复杂度也是O(N)
 *
 * solution2: partition方法
 * 如果我们想要O(1)的空间复杂度怎么办？那么哈希表肯定就不能考虑了。我们考虑一下这个题的特性，某个数字出现的次数超过了数组长度的一半，那么如果排序数组的中位数
 * 一定就是这个待查找的数字，我们有成熟的时间复杂度为O(N)算法来得到数组中任意第K大的数字，这就要借助快排中partition函数的思路。我们知道partition函数是在数组中随机找一个元素作为
 * pivot，然后把小于pivot的值放到数组的左边，大于pivot的放在右边，然后返回pivot这个元素应该处于的位置，也就是index值，这时候如果index刚刚好就是数组的正中间位置，那么我们自然就
 * 找到了这个数；如果index大于数组中位数的位置，那么说明待查找的值还在前半段，这个时候，再缩小end的值，对前半段进行partition划分；如果index小于中位数的位置呢？那么中位数肯定在
 * 数组后半部分，此时我们只需要再对数组后半部分进行partition就可以了。
 * 时间复杂度：O(N)，空间复杂度：O(1)
 *
 * solution3：找规律
 * solution1需要额外的空间，solution2呢，需要改变数组，那么有没有一种方法，即不需要额外空间，又不改变数组，还能时间复杂度达到O(N)呢？不好意思，还真有！
 * 这道题透露着什么规律呢？一个数组出现的次数超过了数组长度的一半，那就是说其他所有数字加起来出现的次数都没它多。这能说明什么呢？我们考虑一种对战的场景，两方对战，一一抵消。我们可以保存
 * 两个值，一个是数组中的数字，一个是这个数字出现的次数。我们遍历数组，当我们遍历到下一个数字的时候，如果这个数字和之前保存的数字一样，我们就把次数加1；如果与当前保存的数字不一样，我们
 * 就把次数减去1；如果发现当前的次数已经是0，而新的数组和之前保存的数字还不一样，那么我们就把新的数字保存起来，次数置为1。持续这样进行，数组遍历完后，保存的数字就是待查找的数字。
 * 时间复杂度：O(N)，空间复杂度：O(1)
 */

// 解法1：哈希表
function solution1(numbers) {
    if (!numbers.length) {
        return 0;
    }
    const hashmap = {};
    const halfLength = numbers.length >> 1;
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (hashmap[number]) {
            hashmap[number]++;
            // 找到了就不再找了
            if (hashmap[number] > halfLength) {
                return number;
            }
        } else {
            hashmap[number] = 1;
        }
    }
    // 这里要考虑一种特殊情况，如果数组中只有一个元素呢？这个元素是肯定满足的，但是在上面的循环中，这唯一的元素并不会第二次被访问到，所以不会被return出去，所以这里要额外判断一下
    // 长度为1的数组
    if (numbers.length === 1) {
        return numbers[0];
    }
    return 0;
}

// 解法2：partition方法
function solution2(numbers) {
    const length = numbers.length;
    if (!length) {
        return 0;
    }
    // 中位数的位置
    const middle = length >> 1;
    let start = 0;
    let end = length - 1;

    // 1. 执行partition函数，将数组划分成两半，得到pivot元素的index值
    let index = partition(numbers, start, end);

    // 2. 判断index和middle的大小，从而得知是否找到了中位数
    while (index !== middle) {
        // 说明中位数在数组后半部分
        if (index < middle) {
            index = partition(numbers, index + 1, end);
        } else {
            // 中位数在数组的前半部分
            index = partition(numbers, start, index - 1);
        }
    }

    // 3. 上面的while循环无论数组中是否能找到出现次数超过一半的值，都会终止，因为肯定能找到一个处于正中间的元素嘛
    // 但是index此时所对应的元素，不一定就是符合要求的，我们还需要遍历一遍数组，来确定是否满足了超过数组长度一半这个要求
    const findedNumber = numbers[index];
    let count = 0;
    for (let i = 0; i < length; i++) {
        if (numbers[i] === findedNumber) {
            count++;
        }
    }
    // 最后找到的元素，长度没超过数组的一半
    if (count * 2 <= length) {
        return 0;
    }
    return findedNumber;
}

/**
 * 经典的partition函数，将数组分成左右两个部分
 * @param {*} array 待分的数组
 * @param {*} start 数组的起始元素
 * @param {*} end 数组的终止元素
 * @return {*} 返回index的位置
 */
function partition(array, start, end) {
    if (!array.length) {
        return null;
    }
    // 取第一个元素作为pivot值
    const pivot = array[start];
    let left = start;
    let right = end;
    while (left !== right) {
        // 顺序很重要，要先从右边开始往左找，原因自己分析一个极端情况就知道了
        while (left < right && array[right] > pivot) {
            right--;
        }
        while (left < right && array[left] <= pivot) {
            left++;
        }
        if (left < right) {
            const temp = array[right];
            array[right] = array[left];
            array[left] = temp;
        }
    }
    array[start] = array[left];
    array[left] = pivot;

    return left;
}


// 方法3：找规律，一一抵消
function solution3(numbers) {
    if (!numbers.length) {
        return 0;
    }
    let number = numbers[0];
    let count = 1;
    for (let i = 1; i < numbers.length; i++) {
        const current = numbers[i];
        // 1. 与之前保存的元素相等，个数加1
        if (current === number) {
            count++;
            continue;
        }
        // 2. 与之前的保存的元素不同，个数减1
        if (count > 0) {
            count--;
        } else {
            // 当前个数已经为0了
            number = current;
            count = 1;
        }
    }

    // 还是要注意验证，是否number这个元素出现的次数超过了一半
    // 不要试图根据count是否大于1来判断，考虑一下[1, 2, 3, 3]这种情况就知道了
    let times = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === number) {
            times++;
        }
    }
    // 最后找到的元素，长度没超过数组的一半
    if (times * 2 <= numbers.length) {
        return 0;
    }

    return number;

}

function testFunc() {
    const numbers = [1, 2, 3, 2, 2, 2, 5, 4, 2];
    // const numbers = [1, 2, 4, 2];
    // const numbers = [1];
    console.log(solution3(numbers));
}

testFunc();