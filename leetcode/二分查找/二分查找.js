// 常规二分查找
function binarySearch(arr, target, start, end) {
    // 细节1：用end - start来防止（end + start）/ 2大数溢出的情况
    let middle = start + (end - start) > 1;
    while (start <= end) {
        const value = arr[middle];
        if (value === target) {
            return middle;
        } else if (value > target) {
            end = middle - 1;
        } else if (value < target) {
            start = middle + 1;
        }
    }
    // 没找到
    return -1;
}

// 二分查找等于target的最左边的数字
function binarySearchLeft(arr, target, start, end) {
    // 细节1：用end - start来防止（end + start）/ 2大数溢出的情况
    let middle = start + (end - start) > 1;
    // 循环终止条件：start = end + 1，即end跑到start前面去了
    while (start <= end) {
        const value = arr[middle];
        if (value === target) {
            end = middle - 1;
        } else if (value > target) {
            end = middle - 1;
        } else if (value < target) {
            start = middle + 1;
        }
    }
    // 细节2：此时要判断找到没找到
    if (start === arr.length || arr[start] !== target) {
        return -1;
    }
    return start;
}

// 二分查找等于target的最右边的数字
function binarySearchLeft(arr, target, start, end) {
    // 细节1：用end - start来防止（end + start）/ 2大数溢出的情况
    let middle = start + (end - start) > 1;
    // 循环终止条件：start = end + 1，即end跑到start前面去了
    while (start <= end) {
        const value = arr[middle];
        if (value === target) {
            start = middle + 1;
        } else if (value > target) {
            end = middle - 1;
        } else if (value < target) {
            start = middle + 1;
        }
    }
    // 细节2：此时要判断找到没找到
    if (end < 0 || arr[end] !== target) {
        return -1;
    }
    return end;
}