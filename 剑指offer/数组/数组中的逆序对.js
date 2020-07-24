/**
 * @desc 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。例如在数组[7, 5, 6, 4]中，
 * 一共存在5个逆序对，分别是(7, 5), (7, 6), (7, 4), (5, 4), (6, 4)。
 *
 * solution1: 暴力求解
 * 常规的做法就是暴力求解，就跟我们自己找逆序对一样，我们先取其中一个数字，然后依次找数组中后面的元素，看看哪个构成逆序对，然后再加1。显然这样的时间复杂度是0(n^2)。
 *
 * solution2: 归并排序
 * 当问题解决不了时，就按照之前提到的几种方法可以思考一下：画图、举例、分解。让我们试试可不可以分解问题来找到答案，如果一个数组拆分成两个小数组，并且两个子数组都已经统计
 * 到逆序对数量，那么如何求得原数组的逆序对数量呢？先试想一下，什么样的两个数组最好找到逆序对呢？显而易见，如果两个子数组都是有序的，那么我们只需要在两个数组的末尾都设置
 * 一个指针，然后从后往前比较就可以了。按照如上的思路分析，我们逐渐有了递归的思路，即大数组的逆序对 = 各子数组的逆序对和 + 合并子数组时统计的逆序对。
 * 我们以题目中的示例[7, 5, 6, 4]为例：
 * 我们先把[7, 5, 6, 4]分解为[7, 5]和[6, 4]两个子数组，为了求得子数组的逆序对，我们还需要继续分解。[7, 5]还可以继续分解为[7]和[5]，[6, 4]分解为[6]和[4]，此时子数组
 * 元素只剩下一个了，自然不能构成逆序对，这就是我们递归的出口。
 * 上面我们求得了子数组的逆序对，现在要开始求合并时候两个子数组互相之间的逆序对了。还记得我们上面说的吗？有序的两个数组之间进行比较，才好统计互相构成的逆序对。所以在合并的时候，
 * 子数组合并完一定要保证是有序的，这就需要第三个数组，也就是合并两个子数组最终得到的那个数组，我们记为copy。当我们合并[7]和[5]时，结果为[5, 7]，得到了一个逆序对；
 * 合并[6]和[4]的时候，结果为[4, 6]，现在有2个逆序对了。现在合并[5, 7]和[4, 6]，上面提到，合并从两个子数组的尾部开始，先比较7和6，显然7>6，因此7大于第二个子数组
 * 的任何一个元素，因此当前逆序对数量 = 2 + 第二个子数组的长度 = 4，然后把7放到copy中，此时第一个子数组的指针指向了5；此时5<6，不构成逆序对，把6放入到copy中；此时子数组之间
 * 只剩下5和4了，构成逆序对，所以 4 + 1 = 5，即总共5个逆序对。remember，copy的填充也是自后往前的，因为要有序嘛。
 *
 */

/**
 * 查找指定数组的逆序对数量
 * @param {*} data 待查找的数组
 */
function inversePairs(data) {
    // 递归出口：如果数组没有元素或者只有一个元素，直接返回0
    if (!data.length || data.length === 1) {
        return 0;
    }

    let count = 0;
    // 1. 开始拆分
    const halfLength = data.length >> 1;
    const leftArr = data.slice(0, halfLength);
    const rightArr = data.slice(halfLength);

    // 2. 统计子数组的逆序对
    const numsOfLeft = inversePairs(leftArr);
    const numsOfRight = inversePairs(rightArr);
    count = numsOfLeft + numsOfRight;

    // 3. 合并两个有序的子数组，并统计互相之间的逆序对
    // note: 这里需要重点注意一下，这里我们合并两个子数组时，是需要回写data原数组的，因为这个data原数组有可能是处于
    // 另外一轮递归中的，它也必须作为一个有序数组去进行比较！

    // 记录当前回写到data中的位置
    let i = data.length - 1;
    while (leftArr.length && rightArr.length) {
        const leftLength = leftArr.length;
        const rightLength = rightArr.length;
        // 左尾指针大于右尾指针
        if (leftArr[leftLength - 1] > rightArr[rightLength - 1]) {
            count = count + rightLength;
            data[i] = leftArr.pop();
        } else {
            data[i] = rightArr.pop();
        }
        i--;
    }
    // 左数组还没空
    while (leftArr.length) {
        data[i] = leftArr.pop();
        i--;
    }
    // 右数组还没空
    while (rightArr.length) {
        data[i] = rightArr.pop();
        i--;
    }

    // 4. 返回总共的逆序对数量
    return count % 1000000007;
}


/**
 * 以上方法有两个问题：
 * 1. 在每次求解子数组的逆序对的时候，都会创建一个临时的子数组，这是额外的空间复杂度，大概在O(nlogn)，这是不能忍的
 * 2. 我们在合并的时候修改了原始数组data，这个是不太合理的。
 * 对于这些问题，因为这道题我们本质上是归并排序的思想，在归并排序中的递归回程中，我们是不断合并两个有序的子序列的，这就势必要用到
 * 辅助数组，在下文中指的是copy。在回程中，我们会将两个小子序列合并为一个有序的子序列，回写会copy中。但是后续还会继续合并子序列啊，
 * 还需要一个辅助数组啊，所以我们又声明了一个copy2，用来进行下一次的合并。所以整体的合并回写是交替进行的。
 *
 * @param {*} data 待查找逆序对的数组
 */
function improvedSolution(data) {
    // 健壮性：数组为空，直接返回0
    if (!data.length) {
        return 0;
    }
    // 辅助数组，用来来回修改
    const copy1 = [...data];
    const copy2 = [...data];
    const count = inversePairesCore(copy1, copy2, 0, data.length - 1);

    return count;
}

/**
 * 递归函数：求原始数组在[start, end]之间的逆序对，并将[start, end]之间的元素排序，填充到copy中。
 * 写递归，一定要明确，你写的这个函数是干啥的，如果一开始没确定清楚，那么递归的逻辑就会非常混乱
 * @param {*} data 当前要统计的数组
 * @param {*} copy 合并时修改的数组
 * @param {*} start 子数组的起始索引
 * @param {*} end 子数组的终止索引
 * @return {number} 逆序对数量
 */
function inversePairesCore(data, copy, start, end) {
    // 1. 递归出口：数组只有一个元素
    if (start === end) {
        // 不要忘了改回copy，因为copy中的这一段还要在另外一个递归中和别人进行比较
        copy[start] = data[start]; // 其实也不是很必要因为这两个值本来就是相等的
        return 0;
    }

    let count = 0;
    // 2. 递归统计子数组的逆序对
    const halfLength = (end - start) >> 1;
    const numsOfLeft = inversePairesCore(copy, data, start, start + halfLength);
    const numsOfRight = inversePairesCore(copy, data, start + halfLength + 1, end);
    count = numsOfLeft + numsOfRight;

    // 3. 合并两个有序数组，并统计互相之间的逆序对，这里合并是修改的是copy数组
    // 指向左子数组的尾部位置
    let i = start + halfLength;
    // 指向右子数组的尾部位置
    let j = end;
    // 指向copy数组的尾部
    let m = end;
    while (i >= start && j >= start + halfLength + 1) {
        if (data[i] > data[j]) {
            count = count + j - start - halfLength;
            copy[m--] = data[i--];
        } else {
            copy[m--] = data[j--];
        }
    }
    //  左数组不为空
    while (i >= start) {
        copy[m--] = data[i--];
    }
    //  右数组不为空
    while (j >= start + halfLength + 1) {
        copy[m--] = data[j--];
    }

    // 4. 返回总的逆序对
    return count;

}



function testFunc() {
    const numbers = [7, 5, 6, 4];
    console.log(improvedSolution(numbers));
}
testFunc();