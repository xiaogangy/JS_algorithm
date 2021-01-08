var rotate = function(nums, k) {
    const length = nums.length;
    const step = k % length;
    if (!length || !step) {
        return nums;
    }
    const reverse = function(arr, start, end) {
        let i = start;
        let j = end;
        while (i < j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    };

    // 1、先对整体翻转
    reverse(nums, 0, length - 1);
    // 2、分别对局部翻转
    reverse(nums, 0, step - 1);
    reverse(nums, step, length - 1);
};
