---
title: 基础-表单值
order: 2
---

# 基础-表单值

### 表单值 API

通过 `createForm` 创建的表单实例，提供了 `useValues、useSetValues、useNoSubscribeUpdate` 来对表单值进行管理。

`useNoSubscribeUpdate` 和 `useValues` 的区别在于, useNoSubscribeUpdate 不会订阅组件的更新, 只会保证状态的持久化

```typescript
const { useValues, useSetValues, useNoSubscribeUpdate } = createForm()

const { initialValues, values, setValues, resetValues, removeValues, setInitialValues } = useValues()

const { setValues, resetValues, removeValues, setInitialValues } = useSetValues()

const { initialValues, values, setValues, resetValues, removeValues, setInitialValues } = useNoSubscribeUpdate()
```

### 多种类型表单项的值

<code src="./demo/use-values/demo1.tsx"></code>

### 表单值操作

<code src="./demo/use-values/demo2.tsx"></code>

### values

表单上各个字段的值的集合

```typescript
const { values } = useValues()

console.log(values)
```

### initialValues

表单初始值，createForm 时传入的 initialValues

```typescript
const { initialValues } = useValues()

console.log(initialValues)
```

### setValues

手动设置表单上的值

1. 设置单个 Field 的值

```typescript
const { setValues } = useValues()

setValues('field1', 'value of field1')
```

2. 设置多个 Field 的值（注意：这里的赋值和 setState 的赋值不同，不是替换原值，而是合并进原值）

```typescript
const { setValues } = useValues()

setValues({
  field1: 'value of field1',
  field2: 'value of field2',
})
```

以上两种方式支持 path 的方式赋值

_注意: 目前只有 values 才支持 path, errors 是扁平结构, 直接用 field 做 key 存储数据_
```typescript
// values = { a: [{ b: 1, { c: 2 } }], d: { e: 1 } }
const { setValues } = useValues()

setValues('a[0].b', '设置 a[0].b')

setValues({
  'a[0].b': '设置 a[0].b',
  'd.e': '设置 d.e',
})
```

3. 通过传入 function 设置 Field 值

```typescript
const { setValues } = useValues()

setValues((values) => {
  values['field1'] = 'value of field1'
  delete values['field2']
})
```

### resetValues

重置整个表单的值和校验错误

1. 不传入任何参数，会将表单的值重置回 createForm 时传入的 initialValues

```typescript
const { resetValues } = useValues()

resetValues()
```

### removeValues

删除一个或多个表单 Field 的值, 支持 path

```typescript
const { removeValues } = useValues()
removeValues('field1')
removeValues(['field1', 'field2'])
```

### setInitialValues

手动设置初始值, 用法同 setValues

```typescript
const { setInitialValues } = useValues()

setInitialValues({ field: '' })
```
