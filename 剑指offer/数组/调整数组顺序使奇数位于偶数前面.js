/**
 * @desc 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
 *
 * solution：设置两个指针，类似于快排的partition函数，一个位于数组起点，一个位于数组结尾。左指针往右移，如果当前访问的节点是偶数，则停止，如果是奇数，则继续右移；
 * 同理，右指针向左移，遇到奇数停止，遇到偶数继续前移。直到二者相遇，说明已经完全交换完毕。
 */

/**
 * 调整
 * @param {*} array 待调整数组
 */
function reorderOddEven(array) {
    let length = array.length;
    if (!length) {
        return array;
    }

    // 设置左右两个指针，来追踪偶数和奇数，并进行交换
    let left = 0;
    let right = length - 1;

    while (left <= right) {
        // 左指针遇到偶数停
        while (left <= right && (array[left] & 1) === 1) {
            left++;
        }
        // 右指针遇到奇数停
        while (left <= right && (array[right] & 1) === 0) {
            right--;
        }

        // 交换左右指针指向的值
        if (left <= right) {
            const temp = array[right];
            array[right] = array[left];
            array[left] = temp;
        }
    }

    return array;
}

/**
 * 扩展1：交换后，要保证奇数与奇数，偶数和偶数的相对位置不变
 *
 * solution：用如上快排的这种partition方法，没法保证稳定性，可以借助一个额外的数组来进行插入
 */
function solution(array) {
    let length = array.length;
    if (!length) {
        return array;
    }

    // 声明结果数组，用于填充
    let result = [];
    for (let i = 0; i < length;) {
        const current = array[i];
        // 遇到奇数就插入到结果数组中
        if ((current & 1) === 1) {
            result.push(current);
            array.splice(i, 1);
            // 这里因为删除了一个元素，不要变索引
            continue;
        }
        i++;
    }

    result = [...result, ...array];
    return result;
}

const testarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testarray2 = [];
const testarray3 = [1];
const testarray4 = [2, 4, 6, 1, 3, 5, 7];
console.log(solution(testarray4));