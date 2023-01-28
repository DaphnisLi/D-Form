---
nav:
  title: 指南
  path: /guide
  order: 1
title: 介绍
order: 1
---

## 安装
``` bash
npm i @daphnis/d-form -S
```

## 特性
- 支持 Ant Design Form
- 内置 [async-validator](https://github.com/yiminghe/async-validator) 进行表单校验
- 支持复杂表单状态的嵌套管理
- 简洁、符合直觉的 API 设计
- 支持 Tree-Shaking

## 待办事项
- [x] 数据和 UI 分离
- [x] 组件级更新
- [x] field 支持路径
- [ ] 子表单
- [ ] 表单生成器


## 方案
- 数据更新：基于发布订阅模式, 在 useForceUpdate 内注册 on 事件
- 所有的工具函数都放在 Context 里
- 在 执行 createForm 时, 将工具函数 Provider 到 value 里, 然后将 root 表单组件传入 withForm
- 表单数据通过闭包保存
- onChange 的时候校验
