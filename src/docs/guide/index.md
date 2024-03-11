---
nav:
  title: 指南
  path: /guide
  order: 1
title: 介绍
order: 1
---

## 表单的痛点
几乎每天都在和表单打交道的我, 遇到过很多坑点, antd 3～5 全用过, formily 也了解过, 我认为开发者在表单场景下面临的痛点主要有如下几点

- 学习成本高
- 坑点多, 使用难度高
- 业务复杂度高
- 前后端数据结构同步有成本

## 我的愿景
希望创造一个足够 __轻__ 的表单, 将具有以下特点

- 能够覆盖任何表单场景
- 学习成本低
- 使用简单, 几乎没有坑点
- 性能及格
- 布局简单, 尽量不需要写样式

## 主要技术栈
- React
- Recoil: 管理数据流
- immer: 解决 setState 更新问题 (深拷贝消耗性能)
- Antd (非必需): 提供布局及样式
- async-validator: 进行表单校验


## 痛点及解决方案

尝试把表单这个大问题拆解, 我们可以得到如下四个小问题
- 数据管理问题
- 字段管理问题
- 校验管理问题
- 联动管理问题

__下面讲讲如何解决__

1、数据管理问题
- 如何承接整个表单的数据流 ?
  - 数据管理方案采用 Recoil, 原子化的设计模式本身就能带来良好的性能, 并且 API 设计全面拥抱 Hook, 被 Facebook 誉为未来的数据管理方案
- 字段多、层级深, 怎么优化性能 ?
  - 使用 immer 解决 setState 的更新缺陷, 由于 setState 无法检测深层次字段的更新, 通常情况下想弥补这样的缺点需要对 state 深拷贝, 但会有性能的损失, immer produce 会拷贝变化, 保留不变
  -  [demo](/guide/basic/use-values#%E5%9F%BA%E4%BA%8E-immer-%E8%83%BD%E6%9C%89%E6%95%88%E6%94%B9%E5%96%84-react-setstate-%E7%9A%84%E7%83%A6%E6%81%BC)

2、字段管理问题: 如何管理深层次的字段 ?
- 可以采用 [path 模式](https://www.lodashjs.com/docs/lodash.get) 的方式进行管理。
- 提供一个创建子表单的方法 createSubForm
- [demo](/guide/advanced/nesting-form#%E5%AD%90%E8%A1%A8%E5%8D%95%E5%B5%8C%E5%A5%97%E5%A4%8D%E7%94%A8)

3、校验管理问题
- 内置 [async-validator](https://github.com/yiminghe/async-validator) 进行表单校验, 校验时机: onChange

4、联动管理问题
- 提供 setValues, 通过此 API 修改字段值
- 字段受控 value、onChange, 并支持复写
- [demo](/guide/advanced/field-change#自定义-field-组件的-value-值和-onchange-回调)

5、数据和视图的关系? 关于声明式、响应式的思考以及如何选择 ?
- 声明式: 先有 DOM, 后有数据, 数据以 UI 为载体, 受 UI 控制, 只有当 UI 存在时, 数据才能存在
  - 优点: 能够做到数据与 UI 同步,
  - 缺点: 操作复杂, 当你给一个组件 set 数据时, 首先要把这个组件渲染出来, 相当于要操作两次
- 响应式: 先有数据, 后有 DOM, UI 受数据控制, 每增加一份数据, 都要有 UI 与之对应
  - 优点: 只需要操作数据即可, UI 会自动根据数据渲染
  - 缺点: 可能会出现脏数据, 不过解决起来也相当简单

6、表单嵌套层级超级深, 怎么优雅的管理深层次表单及表单复用 ?
- 每一个表单组件都可以封装成一个函数（工厂模式）, 这个函数接受一个 store。
- store 中保存当前表单的所有状态信息, 在需要使用该子表单的页面直接引用即可。

7、如何适配不同的组件库
- 使用 monorepo 对整个表单库进行合理拆分, [拆分如下](/guide#项目结构)


## 项目结构
后期会分离出三个 npm 包: d-form-core、d-form-ui、d-form-antd
- d-form-core: __核心__, 提供数据、字段、校验、联动等非 UI 的基础能力
- d-form-ui: __兼容__, 对 Form.Item 封装并提供 Field 组件, 将表单能力附加其上
- d-form-antd: __UI__, 执行 d-form-ui 包提供的 API, 并将 Form.Item 传递进去, 获得本表单的能力, 提供 __布局、控件、样式__ 等能力

## 架构图
![D-Form 架构](https://form-1305245006.cos-website.ap-shanghai.myqcloud.com/architectureDiagram.png)

