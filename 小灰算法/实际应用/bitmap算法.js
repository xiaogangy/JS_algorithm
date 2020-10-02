/**
 * @description Bitmap算法
 * Bitmap算法，即位图算法，指的是用一个bit位来存储一个数据的方法。有点类似于计数排序，这种方式也是借助了使用索引来定位元素的思路。举例来说，[2, 1, 4, 7]这个数据
 * 如果用数组来存储的话，数组中每个数都是一个number类型，我们知道JS中一个number类型使用的长度是64位，即8个字节，而使用bitmap存储的思路为：
 * 先声明一个8位的bitmap，这8个bit初始时内容为0|0|0|0|0|0|0|0，从右向左开始看，每一位分别对应着从0到7的number数值，初始时全为0，表示目前bitmap中没有任何数值。
 * 插入数值2，从右开始，第三位表示数值2，将该位的0变为1，表示存储了2个数值，同理，存储剩余的数值，则bitmap变为1|0|0|1|0|1|1|0，即可表示存储了如上数组，这样的话，我们总共使用了
 * 8bit，即1byte来存储，减少了非常多的空间。
 *
 * 用途：
 * - 方便查询，在海量数据中，查询某个数是否存在，只需要找到该数对应的index，然后查看该位中的值是否为1
 * - 海量数据去重
 * - 海量数据查找非重复的数值（借助两个bitmap，第一个bitmap仍然存储是否存在，第二个bitmap存储该值出现的次数，可以用0表示出现了多次，1表示出现了1次，然后二者做与运算）
 * - 海量数据排序，即放大版的计数排序
 */

function createBitmap(size) {

    // 声明bitmap的大小，即位数
    const capacity = size;
    // words是一个数组，数组中存储的都是number类型，一个number类型占64位，所以bitmap就是64+64+64……这么多位
    // 根据谷歌EWAH的习惯，我们把一个64位称之为一个word
    // 这里getWordIndex的参数要减1的原因是，最低位是从0开始的，所以64位bitmap所能表示的最大整数为63
    const words = new Array(getWordIndex(size - 1) + 1).fill(0);

    /**
     * 定位某个数所在的word
     * @param {*} bitIndex 某个数值，例如64，就表示64这个数，实际上是从右往左数的第65位
     * @return {number} 返回对应word的索引
     */
    function getWordIndex(bitIndex) {
        // 右移6位，相当于除以64
        // 注意这里是右移6位，而不是右移8位，现在是一个number类型可以表示64个数字，64 = 2^6，所以才右移6位
        return bitIndex >> 6;
    }

    /**
     * 判断bitmap某一位的状态
     * @param {*} bitIndex 位图的第bitIndex位（从0开始）
     * @return {boolean} 返回true表示，该位置有值，false相反
     */
    function getBit(bitIndex) {
        if (bitIndex < 0 || bitIndex > capacity) {
            throw new Error('超出bitmap有效范围');
        }
        const wordIndex = getWordIndex(bitIndex);
        // 这里的逻辑其实很简单，要判断某一个bit位是否为1，只需要构造一个在那一位为1，其余位都为0的数，然后用这个数与bitmap做与运算
        // 下面的代码之所以还要读取words[wordIndex]，这是因为number类型在进行左移位运算时，如果位移的长度大于存储长度，会做取余处理
        // 即1<<64  等价于  1<<1，1<<65 等价于 1<<2
        return (words[wordIndex] & (1 << bitIndex)) !== 0;
    }

    /**
     * 把bitmap某一位设置为true
     * @param {*} bitIndex 位图的第bitIndex位（从0开始）
     */
    function setBit(bitIndex) {
        if (bitIndex < 0 || bitIndex > capacity) {
            throw new Error('超出bitmap有效范围');
        }
        const wordIndex = getWordIndex(bitIndex);
        words[wordIndex] |= (1 << bitIndex);
    }

    return {getBit, setBit};
}

function testFunc() {
    const myBitmap = createBitmap(128);
    myBitmap.setBit(126);
    myBitmap.setBit(75);
    console.log(myBitmap.getBit(126));
    console.log(myBitmap.getBit(75));
    console.log(myBitmap.getBit(16));
}

testFunc();