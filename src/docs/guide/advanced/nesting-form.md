---
title: 进阶-嵌套表单
order: 4
---

# 进阶-嵌套表单

其实这里一开始打算提供个 createSubForm, 但有个问题不知道该如何是好
- subForm 内部的状态是否要做局部状态
  - 如果做局部状态, 那就要将 subForm 当成一个局部的表单, 内部就不能获取全部表单数据, 只能获取局部数据
  - 如果不做局部状态, 那么势必会造成状态混乱, 会产生很多烦恼, 比如给 setValues 传 field, 是否应该加上父级数据结构呢?

好在一开始给 field 增加了 path 的能力, 使得管理子表单变得更加灵活

### 三层嵌套表单
<code src="./demo/nesting-form/demo1"></code>
