/**
 * @description 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * 
 * solution: 每一行从左向右递增，从上往下递增，我们可以把他们想象成一个有序的一维数组，只不过是在右上角折了一下，这就是这道题的出发点
 * 从右上角（或者左下角也可以）出发，判断右上角的值和target的大小，如果current > target，则说明当前这一列肯定都比target大了，就不用再考虑这一列；如果current < target，则说明这一行的元素都要小于target，
 * 这一行其他元素也不用比较了，如果current = target，那自不用说，直接返回就哦了。
 *
 */

function Find(target, array) {

    const rows = array.length;
    const columns = rows && array[0].length;
    // 数据都没有，直接返回得了
    if (!rows || !columns) {
        return false;
    }

    // 数组最大值和最小值
    let max = array[rows - 1][columns - 1];
    let min = array[0][0];
    if (target < min || target > max) {
        return false;
    }

    // 取右上角作为判断点
    let row = 0;
    let column = columns - 1;
    // 循环终止条件，直到缩减到左下角
    while (row < rows && column >= 0) {
        const current = array[row][column];
        if (current === target) {
            return true;
        }
        if (current < target) {
            row++;
        } else {
            column--;
        }
    }
    // 能走到这里就是循环完都没找到，直接返回false
    return false;

}
