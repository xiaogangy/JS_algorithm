/**
 * @description 有一个无序整型数组，如何求出该数组排序后的任意两个相邻元素的最大差值？要求时间和空间复杂度尽量低
 */


// solution1: 随便找一种O(nlogn)的排序算法，对数组进行排序，然后对排序后的数组，计算相邻元素的差值
// 这种方法的时间复杂度为O(nlogn)，在不影响原数组的情况下，空间复杂度为O(n)


/**
 * solution2: 利用计数排序的思想，统计每个整型数值出现的次数，然后算出相邻两个整数数值之间最多有多少个0
 * Example: 以数组[2, 6, 3, 4, 5, 10, 9]为例
 * - 找出数组的最大值max，和最小值min，计算出二者的差d = max - min，声明一个长度为d+1的统计数组。例如上述结果为一个长度为8的空数组，偏移量为2
 * - 遍历原数组，对每个元素，计算出它在统计数组中的index，然后把该index的值加1。经过这一步后，统计数组变为[1, 1, 1, 1, 1, 0, 0, 1, 1]
 * - 遍历统计数组，找出连续出现0的最大次数，这个次数再+1，就是最大相邻差
 * 问题：这个方法虽然可以线性时间内解决问题，但是空间复杂度可能会很大，例如整型数组为[1, 3, 10000]，因为d值过大，建立的数组就会很大，这其实是
 * 没必要的，这时候，就可以把桶排序的思想搬上来，非常类似
 */


/**
 * solution3: 利用桶排序的思想，将原数组中的元素放入合适的桶中，然后找出两个非空相邻桶中左边的最大值和右边最小值的差距的最大值，即为答案
 * 这一块有点绕，我自己梳理一下：
 * - 根据原数组的元素个数n，声明桶的个数也为n
 *   这里必须要声明为n，是为了后面找差值的逻辑服务。设为n个桶后，最好的情况就是平均分布，n个元素分布在n个桶中，那么最大差值当然可以用上述公式解决。
 *   那么如果元素不能均分到桶中呢？由于是n个桶n个元素，那么必然会至少有一个桶是空的，这时候左边非空桶和右边非空桶的差值，必然是大于一个桶内元素最大值和最小值差距的，
 *   因此上述的求解办法仍然可以适用
 * - 声明的n个桶，除了最后一个桶放最大值外，其余每个桶的区间跨度为(max - min)/(n - 1)
 * - 遍历原数组，将元素插入到对应的桶中。每个桶要记录当前桶内的最大值和最小值，桶内无需排序，用不到
 * - 遍历每个桶，找两个相邻非空桶，左桶最大值和右桶最小值之间的差值的最大值，即为结果
 */
function getMaxSortedDistance(arr) {
    // 1. 先求出最大值和最小值，计算差值
    let min = arr[0];
    let max = arr[0];
    let length = arr.length;
    for (let index = 1; index < length; index++) {
        if (arr[index] < min) {
            min = arr[index];
        }
        if (arr[index] > max) {
            max = arr[index];
        }
    }
    let d = max - min;
    if (d === 0) {
        return 0;
    }

    // 2. 初始化桶
    const bucketCount = length;
    const bucketDistance = d / (bucketCount - 1);
    const bucketList = new Array(bucketCount).fill(0).map(item => (new Bucket()));

    // 3. 遍历数组，把元素放入合适的桶中，并记录每个桶的最大值和最小值
    for (let i = 0; i < length; i++) {
        const current = arr[i];
        // 确定要插入到的桶的下标
        const index = Math.floor((current - min) / bucketDistance);
        if (bucketList[index].max === null || bucketList[index].max < current) {
            bucketList[index].max = current;
        }
        if (bucketList[index].min === null || bucketList[index].min > current) {
            bucketList[index].min = current;
        }
    }

    // 4. 遍历桶，左边桶和最大值和右边非空桶的最大值差值计算，最大差值即为结果
    let leftMax = bucketList[0].max; // 最小桶肯定不会为空，所以放心大胆的用
    let maxDistance = 0;
    for (let j = 1; j < length; j++) {
        const right = bucketList[j];
        const rightMin = right.min;
        if (right.min === null) {
            continue;
        }
        if ((rightMin - leftMax) > maxDistance) {
            maxDistance = rightMin - leftMax;
        }
        leftMax = right.max;
    }

    return maxDistance;
}

function Bucket() {
    this.max = null;
    this.min = null;
}

function test() {
    const array = [2, 6, 3, 4, 5, 10, 9];
    console.log(getMaxSortedDistance(array));
}

test();