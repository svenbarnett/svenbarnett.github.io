---
title: 寻找重复数——LeetCode287
keywords: 寻找重复数,二分法,算法,leetcode
description: 使用二分法解决寻找重复数，练习二分法使用
date: 2021-11-11 21:02:11
tags:
- leetcode
- 算法
- 二分法
- 快慢指针
---

给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。
假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。
你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。
Leetcode-287 链接：https://leetcode-cn.com/problems/find-the-duplicate-number

<!-- more -->

示例 1：
```
输入：nums = [1,3,4,2,2]
输出：2
```

示例 2：
```
输入：nums = [3,1,3,4,2]
输出：3
```

示例 3：
```
输入：nums = [1,1]
输出：1
```

示例 4：
```
输入：nums = [1,1,2]
输出：1
```

提示：
```
1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
```
nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次

### 解题

1. 二分法

针对用例`[1,3,4,2,2]`

定义一个`cnt`数组用来存储小于等于 索引 `i` 的总数

如果知道 cnt 数组随数字 index 逐渐增大具有单调性，那么当num[index] 那么我们就可以直接利用二分查找来找到重复的数

| nums |  1   |  2   |  3   |  4   |
| :--: | :--: | :--: | :--: | :--: |
| cnt  |  1   |  3   |  4   |  5   |

小于等于1的一个

小于等于2的三个

小于等于3的四个

小于等于4的五个

由此可见：我们的目标是2，target满足: target前面的 `cnt[i] <=  i`, 目标值target之后的 `cnt[i] > i`

实际上可以归纳为：

- 如果测试用例的数组中 `target` 出现了两次，其余的数各出现了一次，这个时候肯定满足上文提及的性质，因为小于 `target` 的数 i 满足 `cnt[i]=i`，大于等于 `target` 的数 `j`满足 `cnt[j]=j+1`。

- 如果测试用例的数组中`target `出现了三次及以上，那么必然有一些数不在 `nums` 数组中了，这个时候相当于我们用`target`去替换了这些数，我们考虑替换的时候对`cnt[] `数组的影响。如果替换的数`i`小于 `target` ，那么在数`i`到`target`区间的值，均减一，其他不变，满足条件。如果替换的数 `j` 大于等于 `target`，那么`target`到 数`j`区间内值均加一，其他不变，亦满足条件。

因此不管多个重复还是两个重复，数组都满足那个性质。

代码实现：

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int n = nums.length;
        int l = 1, r = n - 1, ans = -1;
        while (l <= r) {
           # 右移动一位，相关于除以2，取中间值
            int mid = (l + r) >> 1;
            int cnt = 0;
            for (int i = 0; i < n; ++i) {
              # 将小于等于中间值都加起来  
              if (nums[i] <= mid) {
                    cnt++;
                }
            }
           # 如果此时的cnt总数小于等于mid，那说明不在mid左边
            if (cnt <= mid) {
               # 把左边拉到中间
                l = mid + 1;
            } else {
                # 否则把右边拉到中间
                r = mid - 1;
                # 记录答案
                ans = mid;
            }
        }
        return ans;
    }
}
```

复杂度分析

时间复杂度：`O(n * logn)`，其中 n为nums 数组的长度。二分查找最多需要二分`O(logn) `次，每次判断的时候需要`O(n)` 遍历 nums 数组求解小于等于mid 的数的个数，因此总时间复杂度为`O(n * logn)`。

空间复杂度：`O(1)`。我们只需要常数空间存放若干变量。

2. 快慢指针

我们对 nums数组建图，每个位置 `i` 连一条 `i→nums[i]` 的边。由于存在的重复的数字 
`target`因此 `target `这个位置一定有起码两条指向它的边，因此整张图一定存在环，且我们要找到的 
`target`就是这个环的入口.

我们先设置慢指针`slow 和快指针` `fast` ，慢指针每次走一步，快指针每次走两步，根据「Floyd 判圈算法」两个指针在有环的情况下一定会相遇，此时我们再将 `slow` 放置起点`0`，两个指针每次同时移动一步，相遇的点就是答案。

代码实现：

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
      	# 找环的入口
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        # 重置slow为起点
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        # 再次相遇 就是环入口
        return slow;
    }
}
```

复杂度分析

时间复杂度：`O(n)`。「Floyd 判圈算法」时间复杂度为线性的时间复杂度。
空间复杂度：`O(1)`。我们只需要常数空间存放若干变量。

