---
title: 基础-表单值
order: 2
---

# 基础-表单值

### 表单值 API

通过 `createForm` 创建的表单实例，提供了 `useValues Hook` 来对表单值进行管理。

```typescript
const { useValues } = createForm()

const { initialValues, values, setValues, resetValues, removeValues, setInitialValues } = useValues()
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

删除一个或多个表单 Field 的值

```typescript
const { removeValues } = useValues()
removeValues('field1')
removeValues(['field1', 'field2'])
```

### setInitialValues

手动设置初始值

```typescript
const { setInitialValues } = useValues()

setInitialValues({ field: '' })
```
