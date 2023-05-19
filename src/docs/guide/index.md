---
nav:
  title: 指南
  path: /guide
  order: 1
title: 介绍
order: 1
---

## 项目结构
后期会分离出三个 NPM 包: d-form-core、d-form-ui、d-form-antd
- d-form-core 包: 提供数据处理
- d-form-ui 包: 提供 Field 组件, 实现字段渲染和各种表单功能
- d-form-antd 包: 以 Form.Item 为参数执行 d-form-ui 包提供的 createFormFactory API

## 痛点及解决方案
- 字段超级多, 怎么优化性能 ?
  - 数据管理方案采用 Recoil + immer。
  - 不可变数据: 对已初始化的“变量”是不可以更改的, 每次更改都要创建一个新的“变量”, 对新的数据进行操作不会影响之前的数据。
  - [案例](/guide/basic/use-values#%E5%9F%BA%E4%BA%8E-immer-%E8%83%BD%E6%9C%89%E6%95%88%E6%94%B9%E5%96%84-react-setstate-%E7%9A%84%E7%83%A6%E6%81%BC)
- 表单嵌套层级超级深, 怎么优雅的管理深层次表单及表单复用 ?
  - 每一个表单组件都可以封装成一个函数（工厂模式）, 这个函数接受一个 store。
  - store 中保存当前表单的所有状态信息, 在需要使用该子表单的页面直接引用即可。
- 如何管理深层次的字段 ?
  - 可以采用 [path 模式](https://www.lodashjs.com/docs/lodash.get) 的方式进行管理。
  - 提供一个创建子表单的方法 createSubForm
  - [案例](/guide/advanced/nesting-form#%E5%AD%90%E8%A1%A8%E5%8D%95%E5%B5%8C%E5%A5%97%E5%A4%8D%E7%94%A8)
- 如何适配不同的组件库
  - 模仿 d-form-antd 包, 创建一个新的 NPM 包

## 架构图
![D-Form 架构](https://form.daphnis.love/architectureDiagram.png)

## 发展历程
其实一开始的实现方案不是下面的那个。

本来想的是基于 class 提供一些工具，然后 new Class 的时候赋值给 store, 这样 store 就可以获得操纵表单的方法。

至于如何更新 Form.Item 组件, 我想采用发布订阅模式, 生成表单时注册 on 事件, 并为 class 中需要更新组件的方法执行 emit 事件。当 on 绑定的事件被执行后, 就执行 useState 的 set 函数, 引起 Form.Item 组件更新。

但在开发完成后发现有一些莫名其妙的 bug（在写这些文字的时候，我已经忘记是什么 bug 了）, 我竟然无法解决。遂选择放弃, 采用下面的方案。
