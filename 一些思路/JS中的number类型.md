# JS中的number类型知识点科普
1. JS中是没有整数类型的，所有的number类型都是使用IEEE754存储的双精度浮点数类型，长度为64位。

2. 这64位的长度，并不是我们传统理解上的都存储有效数值，实际上，它的存储结构为：
![JS中number类型存储模式](double_float.png)  
其中第1位最高位，表示符号位。后面接着的11位为指数位，存储该数字用科学计数法表示时的偏移量。再后面的53位表示尾数，这才是JS存储数据的有效位。

3. JS中可以表示的最大安全整数是2^53 - 1 = Number.MAX_SAFE_INTEGER = 9007199254740991，至于为什么是53次方，这里简单说一下，下面文章里有更准确的解释。用科学计数法表示时，默认最左边的一位始终是1，以十进制为例，科学计数法表示530为5.3 * 10^2，最左边会保留一位，在JS中默认最左边为1，这就相当于多了一位存储空间，所以计算时，指数为53。  
注意这里说的***最大安全整数***，并不是最大整数，只是JS可以表示最大准确的整数，超过这个数之后的运算就不准确了，原因见文章[1]和[2]。

4. 小心位运算：虽然JS的number有64位，但是在进行位运算时，会把浮点数截断为32位的有符号整型，也就是说超出这个范围的位移操作将会得到错误的值。

5. 还是位移运算：猜测一下 1 << 32 的值 和 1 << 31后再 << 1的值：   
    ```JS 
    1 << 32  // 1
    let a = 1 << 31; // a = -2147483648
    a << 1; // a = 0;
    ```
    造成这个计算值不同的原因为：
    >Shift operators convert their operands to 32-bit integers in big-endian order, and return a result of the same type as the left operand. Only the low five bits of the right operand will be used.  

    也就是当右侧位移数只会取其最低位的5bit，这样的话，1 << 32 就等价于 1 << 0，结果即为1。同理我们可得一个结论：  
    ***右侧operator的真正有效值为模32，即operator = operator % 32;***

6. 0.1 + 0.2 === 0.3这个等式为false，原因是因为在表示0.1和0.2的时候，由于精度问题就进行了两次四舍五入操作，在计算他们俩之和的时候，又进行了一次四舍五入，这与0.3进行一次四舍五入表示的值显然不同。具体原因见文章[1]。

7. 关于负数位移的一些知识（推荐查看文章13.）  
在机器中，数的二进制码都是其补码。  
① 负数的右移：需要保持数为负数，所以操作是对负数的二进制位左边补1。如果一直右移，最终会变成-1，即(-1)>>1是-1。  
② 负数的左移：和整数左移一样，在负数的二进制位右边补0，一个数在左移的过程中会有正有负的情况，所以切记负数左移不会特殊处理符号位。如果一直左移，最终会变成0。


# 推荐文章阅读
1. [(译)关于JS中的number类型，你需要在知道的东西](https://genuifx.github.io/2018/04/17/here-is-what-you-need-to-know-about-javasciprt-number-type/)  
2. [Here is what you need to know about JavaScript’s Number type](https://medium.com/angular-in-depth/javascripts-number-type-8d59199db1b6)  
3. [The mechanics behind exponent bias in floating point](https://medium.com/angular-in-depth/the-mechanics-behind-exponent-bias-in-floating-point-9b3185083528#.zacphtue3)  
4. [How Computers Represent Negative Binary Numbers?](https://www.programminglogic.com/how-computers-represent-negative-binary-numbers/)
5. [源码，反码，补码详解](https://www.cnblogs.com/zhangziqiu/archive/2011/03/30/computercode.html#!comments)
6. [(维基百科)Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)
7. [How numbers are encoded in JavaScript](https://2ality.com/2012/04/number-encoding.html)
8. [JS数值](https://wangdoc.com/javascript/types/number.html)
9. [显示JS存储方式的神器](http://alvarto.github.io/VisualNumeric64/#1)
10. [图解：JavaScript中Number的一些表示上/下限](https://segmentfault.com/a/1190000000407658#item-3)
11. [MDN-位运算](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
12. [JS如何处理超过32位的整数的位运算](https://blog.csdn.net/LingXi__Y/article/details/82022828)
13. [原码、补码以及正数/负数的左移和右移](https://blog.csdn.net/qq_42780289/article/details/103970952?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase)