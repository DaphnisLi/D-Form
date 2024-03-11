---
nav:
  title: 指南
  path: /guide
  order: 1
title: 介绍
order: 1
---

## 思考
几乎每天都在和表单打交道的我, 遇到过很多坑点, antd 3～5 全用过, formily 也了解过, 我认为开发者在表单场景下面临的痛点主要有如下几点

- 学习成本高
- 坑点多, 使用难度高
- 业务复杂度高
- 前后端数据结构同步有成本

## 愿景
我希望创造一个足够 __轻__ 的表单, 将具有以下特点

- 能够适应任何表单场景
- 学习成本低
- 使用简单, 几乎没有坑点
- 性能及格
- 布局简单, 尽量不需要写样式

## 主要技术栈
- React
- Recoil: 管理数据流
- immer: 解决 setState 更新问题 (深拷贝消耗性能)
- Antd (非必需): 提供布局及样式

## 痛点及解决方案
- 关于声明式、响应式的思考以及如何选择 ?
  - 声明式: 先有 DOM, 后有数据, 数据以 UI 为载体, 受 UI 控制, 只有当 UI 存在时, 数据才能存在
    - 优点: 能够做到数据与 UI 同步,
    - 缺点: 操作复杂, 当你给一个组件 set 数据时, 首先要把这个组件渲染出来, 相当于要操作两次
  - 响应式: 先有数据, 后有 DOM, UI 受数据控制, 每增加一份数据, 都要有 UI 与之对应
    - 优点: 只需要操作数据即可, UI 会自动根据数据渲染
    - 缺点: 可能会出现脏数据, 不过解决起来也相当简单
- 字段多、层级深, 怎么优化性能 ?
  - 数据管理方案采用 Recoil + immer。
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

## 项目结构
后期会分离出三个 NPM 包: d-form-core、d-form-ui、d-form-antd
- d-form-core 包: 提供数据处理
- d-form-ui 包: 提供 Field 组件, 实现字段渲染和各种表单功能
- d-form-antd 包: 以 Form.Item 为参数执行 d-form-ui 包提供的 createFormFactory API

## 架构图
![D-Form 架构](https://form-1305245006.cos-website.ap-shanghai.myqcloud.com/architectureDiagram.png)

