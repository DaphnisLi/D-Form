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
- [ ] validateAndScroll 设置偏移量
