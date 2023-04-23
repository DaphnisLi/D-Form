---
title: 进阶-列表表单
order: 2
---

# 进阶-列表表单


<code src="./demo/list-form/demo1.tsx"></code>


### 内嵌于 Table
<code src="./demo/list-form/demo2.tsx"></code>


### 基于虚拟列表渲染超多数据
<code src="./demo/list-form/demo3.tsx"></code>

基本思路
- 只渲染部分数据 visibleCount
- 获取可渲染的部分数据: 根据 scrollTop 获取 startIndex。
  ```typescript
  const startIndex = Math.floor(e.target.scrollTop / rowHeight)
  setList(dataSource.slice(startIndex, startIndex + visibleCount))
  ```
- UI 部分
  - 用 2 将 1 的滚动条撑出来。因为 1 设置了 visibleHeight, 所以长度不会被撑开
  - 3 动态的改变 top 以调整其在 1 中的位置, 从而实现数据和滚动条同步
- 优化
  - 向下滚动: 设置缓存数据, 偏移量 >= cacheCount 时 setList
  - 向上滚动: 暂时无法优化, 只能缓存后面的数据, 不能缓存前面的数据, 因为 list 是从 0 开始渲染的.

![虚拟列表](https://form.daphnis.love/virtualList.png)
