// 预期返回两个值：从当前节点左侧出发和右侧出发能获得到的最大交错路径长度
function coreFunction(root, max) {
    if (!root) {
        return {
            left: -1,
            right: -1
        };
    }
    const leftRet = coreFunction(root.left);
    const rightRet = coreFunction(root.right);

    const chooseRight = rightRet.left + 1;
    const chooseLeft = leftRet.right + 1;
    const currentMax = Math.max(chooseLeft, chooseRight);
    max.val = max.val > currentMax ? max.val : currentMax;

    return {
        left: chooseLeft,
        right: chooseRight
    };
}

function mainFunc(root) {
    if (!root) {
        return null;
    }
    const max = {val: 0};
    coreFunction(root, max);
    return max.val;
}