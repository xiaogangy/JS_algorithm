/**
 * 这种方法在数组超长之后会不对，因为会大数溢出
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (A) {
    if (!A || !A.length) {
        return [];
    }
    const result = [];
    let current = 0;
    for (let i = 0; i < A.length; i++) {
        current = current * 2 + A[i];
        result.push(current % 5 === 0);
    }
    return result;
};

/**
 * 只判断个位数是否模5为0就可以
 * @param {*} A
 */
var prefixesDivBy5 = function (A) {
    if (!A || !A.length) {
        return [];
    }
    const list = [];
    let prefix = 0;
    const length = A.length;
    for (let i = 0; i < length; i++) {
        prefix = ((prefix << 1) + A[i]) % 5;
        list.push(prefix === 0);
    }
    return list;
};
