---
group:
  path: /advanced
  title: 进阶
  order: 3
title: 进阶-自定义组件
order: 1
---

# 进阶-自定义组件

### 自定义组件

Field 组件支持外部的自定义组件作为 `children`，这个组件会接受 `{ value: any, onChange: (value: any) => void }` 的 props，可以通过这个组件来控制 Field 的值。

<code src="./demo/custom-component/demo1.tsx"></code>

### 渲染函数

Field 组件支持渲染函数作为 `children`，这个函数会接受 `{ value: any, onChange: (value: any) => void }` 对象参数，可以通过这个函数来控制 Field 的值。

<code src="./demo/custom-component/demo2.tsx"></code>
