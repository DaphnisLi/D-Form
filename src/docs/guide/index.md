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
npm i @daphnis/d-form
```

## 特性
- 支持 Ant Design Form
- 内置 [async-validator](https://github.com/yiminghe/async-validator) 进行表单校验
- 支持复杂表单状态的嵌套管理
- 简洁、符合直觉的 API 设计
- 支持 Tree-Shaking (CDN 引入不支持)

## 待办事项
- [x] 数据和 UI 分离
- [x] 支持 path 修改表单状态, 目前只支持 field、useValues、useNoSubscribeUpdate
- [ ] 表单元信息、表单生成器
- [ ] validateAndScroll 设置偏移量（scrollMarginTop）
- [ ] 引入单元测试（投入使用时）
- [ ] 创建子表单 createSubForm

## 发展历程
其实一开始的实现方案不是下面的那个。

本来想的是基于 class 提供一些工具，然后 new 的时候赋值给 store，这样 store 就可以获得操纵表单的方法。

至于如何更新 Form.Item 组件，我想采用发布订阅模式，生成表单时注册 on 事件，并为 class 中需要更新的方法执行 emit 事件。当 on 绑定的事件被执行后，就执行 useState 的 set 函数，引起 Form.Item 组件更新。

但在开发完成后发现有一些莫名其妙的 bug（在写这些文字的时候，我已经忘记是什么 bug 了），我竟然无法解决。遂选择放弃，采用下面的方案

## 思路
- UI：不想管！！市面上不同风格的 UI 组件数不胜出。我的表单可以只提供基础的数据管理能力，并且能够快速的适应不同的表单库（Form.Item）。
- 数据处理：数据管理方案采用 Recoil，并对其进行封装，输出一堆能够操纵表单各种信息的 Hook。我觉得 Recoil 的数据原子化思想很好（踩一下 Context，😁），能够很大程度上优化表单数据管理的性能。
- 表单校验使用 async-validator，在 onChang 时校验，完成后将错误传给 Form.Item
- 表单嵌套及复用：每一个根表单要有一个单独的 RecoilRoot，子表单封装成一个函数，接收一个表单状态 Store 即可直观的实现表单嵌套和复用，字段名称 field 采用 [path 模式](https://www.lodashjs.com/docs/lodash.get)，这样可以方便的管理各级数据。
  - 未来会提供一个生成子表单的方法 createSubForm
