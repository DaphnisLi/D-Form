---
group:
  path: /api
  title: API 概览
  order: 3
title: API
order: 1
---

# API 概览

### `createForm<FormState>([initialValue])`

创建一个表单 Store

使用方式如下：

```ts
export const formStore = createForm()
```

`formStore` 的构成如下

| 参数              | 说明                                                                                                                                | 类型                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `withForm`        | 为表单组件提供最外层的 Provider，使得该组件以及其子组件能够使用 useValues、useSetValues、useValidate、useErrors、useSetErrors 等 hook 获取到表单数据 | `(ReactComponent) => ReactComponent`                                                                                    |
| `Field`           | 表单项组件，封装了 `Form.FormItem`                                                                                                                          | `ReactComponent`                                                                                                        |
| `useValues`       | 获取表单内各字段的值以及各种操作值的方法的 Hook                                                                                     | `() => ({ initialValues, values, setValues, resetValues, removeValues, setInitialValues })` |
| `useSetValues`       | 获取表单内各字段的各种操作值的方法的 Hook                                                                                 | `() => ({ { setValues, resetValues, removeValues, setInitialValues } })`                                                  |
| `useValidate`     | 获取表单内各字段的校验规则以及各种操作校验规则的方法的 hook                                                                         | `() => ({ validate, setRules, getRule, getRules, removeRule, removeRules })`     |
| `useErrors`       | 获取表单内错误信息以及各种操作错误信息的方法的 hook                                                                                 | `() => ({ errors, setErrors, resetErrors, removeError, removeErrors })`                                                  |
| `useSetErrors`       | 获取表单内错误信息以及各种操作错误信息的方法的 hook                                                                                 | `() => ({ setErrors, resetErrors, removeError, removeErrors })`                                                  |



### Field

Field 支持的 props 如下：

| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| --- | ---- | --- | ------- | ----- |
| `field`| 对应的字段 key | `string`  | 是       | -      |
| `children`| 子元素	 | `ReactElement ｜ ((controlProps: FieldChildProps<V>) => ReactNode)`  | 是       | -      |
| `initialValue`| 默认值, 如果不设置默认值，则为空（不建议通过该属性设置初始值，建议在 createForm 中传入初始值 ）	 | `any`  | 否      | -      |
| `value`| 手动指定 value, 受控	 | `any`  | 否       | -      |
| `rule`| 校验规则 [async-validator](https://github.com/yiminghe/async-validator)  | `Rule`  | 否       | -      |
| `showError`| 是否展示错误  | `boolean`  | 否       | true     |
| `isDelRulesWhenDestroy`| Field 组件卸载时, 同步删除 Rule、Error | `boolean`  | 否       | -      |
| `pureChildren`| 是否使用原始组件, 设置为 true 则不代理原始组件 | `boolean`  | 否       | -      |
| `className`| 附加类名 | `string`  | 否       | -      |
| `valuePropKey`| value key, 默认是 value | `string`  | 否       | 'value'     |
| `trigger`| onChange key, 默认是 onChange | `string`  | 否       | 'onChange'     |
| `required`| 是否必填 | `boolean`  | 否       | -     |
| `onChange`| 子组件变化回调 | `(value) => void	`  | 否       | -     |


除了这些 props 之外, 还支持 Antd Design `Form.Item` 的所有 props。

_注意：一个 Field 只能有一个 child_
