---
title: 基础-表单校验
order: 3
---

# 基础-表单校验

### 表单校验 API

通过 `createForm` 创建的表单实例，提供了 `useValidate Hook` 来对表单进行校验。

```typescript
const { useValidate } = createForm()

const { getRules, setRules, removeRules, validate, validateAndScroll } = useValidate()
```

### 基础校验

<code src="./demo/use-validate/demo1.tsx"></code>

### 手动操作校验规则

<code src="./demo/use-validate/demo2.tsx"></code>

### 异步校验

<code src="./demo/use-validate/demo3.tsx"></code>

### 滑动到第一个错误的 Field

此页面顶部有多图层 (设置了 position: fixed), 出现了遮挡

<code src="./demo/use-validate/demo4.tsx"></code>

### validate

```typescript
const { validate } = useValidate()

// 校验的参数如下：
interface ValidateOption<VS> {
  /** 校验指定的 field, 不传则校验全部, 要以 Field 填写的 field 字段为准 */
  fields?: string | string[]
  /** 回调函数 */
  callback?: ValidateCallback<VS>
  /** 是否重置之前的校验错误 */
  isResetErr?: boolean
  /** 是否在校验失败时自动滚动到错误 field */
  isScroll?: boolean

  // ? 未来可能支持
  /** 校验多个 field 和对应表单值 */
  // fieldsValue?: { [key: string]: any }
  /** 排除在外的多个 field */
  // excludeFields?: string[]
}

// 校验单个字段
validate({
  field: 'field1',
  callback: (error, values) => {
    console.log(error, 'error')
    console.log(values, 'values')
  }),
})

// 校验多个字段
validate({
  fields: ['field1', 'field2'],
  callback: (error, values) => {
    console.log(error, 'error')
    console.log(values, 'values')
  }),
})

// 校验所有字段
validate({
  callback: (error, values) => {
    console.log(error, 'error')
    console.log(values, 'values')
  }),
  isResetErr: true
})

// 返回的校验结果如下：
interface ValidateResult {
  errors?: ValidateError
  fields?: FieldErrorList
  isPass: boolean
}

// 返回值为 promise
const validateRes = await validate({})
console.log(validateRes.errors)
if (!validateRes.isPass) {
  return
}
```


### validateAndScroll

滑动到第一个错误的 Field, 用法和 validate 一样

_注意: 如果页面顶部有多图层 (比如设置了 position: fixed), 则可能会出现遮挡_

后期肯那个会设置提供一个设置偏移量的参数

### getRules

获取表单上各 Field 的校验规则的集合

```typescript
const { getRules } = useValidate()

console.log(getRules(['filed1', 'filed2']))
console.log(getRules())
```

### setRules

手动设置表单的校验规则

```typescript
const { setRules } = useValidate()

setRules('field1', { /** 'rule of field1' */ })
```

### removeRules

删除一个或多个 Field 的校验规则

```typescript
const { removeRules } = useValidate()

removeRules('field1')
removeRules(['field1', 'field2'])
```
