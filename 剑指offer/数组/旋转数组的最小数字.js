/**
 * @description 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如数组[3,4,5,1,2]为[1,2,3,4,5]的一个旋转，该数组的最小值为1。NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 *
 * 思路：
 * 方法1：找数组的最小值，最直观的方法，我们可以顺序遍历一遍数组，即可得到最小值，时间复杂度为O(n);
 *
 * 方法2：如果数组是一个顺序序列，那我们知道二分查找是最快的，那么二分查找是不是也能应用到这儿呢？
 * 我们可以发现旋转之后的数组，可以分为两个有序递增序列，一般规律为第一个子序列的值全部大于第二个子序列（当然，旋转之后可能数组没变化，这种特殊情况要处理一下）
 * 那么我们可以借鉴二分查找的思路，设立两个指针，分别指向序列第一个值(index1)和最后一个值(index2)，根据这两个值来确定中点值，这个中间值有什么特点呢？
 * - 如果这个值大于左指针位置处的值，那说明这个中点值位于第一个递增序列里，而最小值显然是第二个递增序列的起点值，所以我们要做的就是把中点值的位置变为index1，然后继续搜寻
 * - 如果这个中点值小于右指针处的值，那么说明它肯定位于第二个递增序列中，最小值仍在他前面或者就是它，所以要把index2设为当前的中间值所在位置
 * 在上面的计算中，index1始终指向第一个子序列，index2始终指向第二个子序列，什么时候到达终点呢？index1和index2相邻时，因为这时候表示第一个子序列的最大值和第二个子序列的最小值相邻了，
 * index2指向的值即为最小值。
 * 注意一种特殊情况，例如原序列为[0, 1, 1, 1, 1], [1, 1, 1, 0, 1]为原数组的一个旋转，或者[1, 0, 1, 1, 1]。但是当我们应用以上规则的时候，左指针的值为1, 右指针的值也为1，中间值也为1。
 * 这个时候应用如上规则，会发现行不通，因为指针目前不知道该怎么移动了，对于这种特殊情况，无论把midIndex变为index1还是index2，都会有问题，上面的例子就会产生两种情况，所以在这种情况下，我们
 * 要退回原始的办法，顺序查找这个子序列的最小值。
 */

function solution(rotateArray) {
    const length = rotateArray.length;
    let leftIndex = 0;
    let rightIndex = length - 1;

    // 先判断几种特殊情况，保证代码的健壮性
    // 1). 数组为空
    if (!length) {
        return null;
    }
    // 2). 数组仍为有序
    if (rotateArray[rightIndex] > rotateArray[leftIndex]) {
        return rotateArray[leftIndex];
    }

    // 进入我们的正题
    let min = rotateArray[leftIndex];
    while (rightIndex >= leftIndex) {
        let midIndex = (rightIndex + leftIndex) >> 1;

        // 右指针的的位置和左指针的位置相邻
        if (rightIndex - leftIndex === 1) {
            min = rotateArray[rightIndex];
            break;
        }

        // 判断一种特殊情况：左右指针和中间值都相等，则顺序查找吧
        if (rotateArray[midIndex] === rotateArray[leftIndex] && rotateArray[midIndex] === rotateArray[rightIndex]) {
            min = rotateArray[leftIndex];
            for (let i = leftIndex + 1; i <= rightIndex; i++) {
                if (rotateArray[i] < min) {
                    min = rotateArray[i];
                }
            }
            break;
        }

        // 中间值大于左指针，说明中间值落到了第一个子序列，此时左指针要变为midIndex
        if (rotateArray[midIndex] >= rotateArray[leftIndex]) {
            leftIndex = midIndex;
            continue;
        } else if (rotateArray[midIndex] <= rotateArray[rightIndex]) {
            // 中间值小于右指针，说明中间值落到了第二个子序列，此时右指针要变为midIndex
            rightIndex = midIndex;
            continue;
        }
    }
    return min;
}

function testFunc() {
    const arr1 = [1, 1, 1, 0, 1];
    const arr2 = [1, 0, 1, 1, 1];
    const arr3 = [3, 4, 5, 1, 2];
    const arr4 = [];
    const arr5 = [1, 2, 3, 4, 5];
    const total = [arr1, arr2, arr3, arr4, arr5];
    total.forEach(item => {
        console.log(solution(item));
    });
}
testFunc();