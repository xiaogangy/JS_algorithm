## 滑动窗口
滑动窗口的本质就是维护一个窗口，左右两端都可以滑动，不断的滑动，然后同时更新答案

## 模板
```java
/* 滑动窗口算法框架 */
void slidingWindow(string s, string t) {
    // need中保存的要查找的元素；window中保存的是当前滑动窗口中的有效信息
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int left = 0, right = 0;
    int valid = 0; 
    while (right < s.size()) {
        // c 是将移入窗口的字符
        char c = s[right];
        // 右移窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        printf("window: [%d, %d)\n", left, right);
        /********************/

        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // d 是将移出窗口的字符
            char d = s[left];
            // 左移窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```