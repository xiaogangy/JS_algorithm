function solution(S) {
    const hashMap = {};
    for (let i = 0; i < S.length; i++) {
        const letter = S[i];
        if (hashMap[letter]) {
            hashMap[letter][1] = i;
        } else {
            // 数组元素分别表示firstIndex和lastIndex
            hashMap[letter] = [i, i];
        }
    }
    // 变成二维数组区间问题
    const array = Object.keys(hashMap).map(item => {
        return hashMap[item];
    });
    array.sort((a, b) => {
        return a[0] - b[0];
    }) 

    // 区间合并问题
    const result = [];
    result.push(array[0]);
    for (let i = 1; i < array.length; i++) {
        const last = result[result.length - 1];
        const current = array[i];
        if (current[0] <= last[1]) {
            last[1] = Math.max(current[1], last[1]);
        } else {
            result.push(current);
        }
    }
    return result.map(item => item[1] - item[0] + 1);
}

function testFunc() {
    const S = 'ababcbacadefegdehijhklij';
    console.log(solution(S));
}
testFunc();
