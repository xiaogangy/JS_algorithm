/**
 * @desc 斐波那契数列指的是这样一串数列，0,1,1,2,3,5,8……，这些数列的规则是后一个数是前两个数字之和
 * 现在要去输入一个整数n，输出斐波那契数列的第n项
 */


// solution1:使用递归来解决问题
// 问题：递归会造成多次计算重复子问题，效率不高
function Fibonacci(n) {

    // 写递归，先确定终止条件
    if (n < 0) {
        return null;
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2);

}

// solution2: 自底向上解决问题，这样不会进行重复计算
function Fibonacci_noRecursive(n) {
    if (n < 0) {
        return null;
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1
    }

    let first = 0;
    let second = 1;
    let third = null;
    for (let i = 2; i <= n; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}

function testFunc() {
    const n = 10;
    console.log(Fibonacci(n));
    console.log(Fibonacci_noRecursive(n));
}

testFunc();