---
title: 基础-表单错误
order: 4
---

# 基础-表单错误

### 表单错误 API

通过 `createForm` 创建的表单实例，提供了 `useErrors Hook` 来对表单校验错误进行管理。

```typescript
const { useErrors } = createForm()

const { errors, setErrors, removeErrors, resetErrors } = useErrors()

const { setErrors, removeErrors, resetErrors } = useSetErrors()

```

### 基础错误管理

<code src="./demo/use-errors/demo1.tsx"></code>

### 不使用 validate 方法，手动校验设置错误

<code src="./demo/use-errors/demo2.tsx"></code>

### errors

表单上当前所有的错误信息

```typescript
const { errors } = useErrors()

console.log(errors)
```

### setErrors

手动设置表单上的错误信息

1. 设置单个 Field 的错误信息

```typescript
const { setErrors } = useErrors()

setErrors('field1', 'error message of field1')
```

2. 设置多个 Field 的错误信息（_注意：这里的赋值和 setState 的赋值不同，不是替换原值，而是合并进原值_）

```typescript
const { setErrors } = useErrors()

setErrors({
  field1: 'error message of field1',
  field2: 'error message of field2',
})
```

3. 通过传入 function 设置 Field 错误信息

```typescript
const { setErrors } = useErrors()

setErrors((errors) => {
  errors['field1'] = 'error message of field1'
  delete errors['field2']
})
```

### removeErrors

移除一个或多个 Field 的错误信息

```typescript
const { removeErrors } = useErrors()
removeErrors('field1')
removeErrors(['field1', 'field2'])
```

## resetErrors

清除所有错误信息

```typescript
const { resetErrors } = useErrors()

resetErrors()
```
