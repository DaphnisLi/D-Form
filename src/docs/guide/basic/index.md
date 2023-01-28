---
group:
  path: /basic
  title: 基础
  order: 1
title: 快速上手
---

## 简单示例

<code src="./Basic.tsx"></code>

### 创建表单

```ts | pure
import { createForm } from '@daphnis/d-form'

const formStore = createForm()
```

### 类型

```ts | pure
import { createForm } from '@daphnis/d-form'

interface FormState {
  singer?: string
  songTitle?: string
}

const formStore = createForm<FormState>()
```

### 初始值

```ts | pure
import { createForm } from '@daphnis/d-form'

interface FormState {
  singer?: string
  songTitle?: string
}

const formStore = createForm<FormState>({
  songTitle: '告白气球',
})
```

### 表单状态

上面的例子用到了一个新的 API `useValues`，它是一个 React Hook。你可以通过它获取到表单的状态：

```tsx | pure
// ...
function Component() {
  const { values } = useValues()

  console.log(values) // 表单状态

  // return ...
}
```

同时，在一些场景下，我们可能需要直接去设置表单状态，你可以通过 `useValues` 提供的 `setValues` 去设置表单状态。

你不需要提供完整的 `values`，它就像 Class Component 的 `this.setState` 一样，会合并状态：

```tsx | pure
// ...
function Component() {
  const { values, setValues } = useValues()

  console.log(values) // 表单状态

  const handleClick = useCallback(() => {
    setValues({ songTitle: '告白气球' })
  }, [setValues])

  return <Button onClick={handleClick}>😊</Button>
}
```

### 表单校验

表单校验是一个表单最最重要的功能，你可以指定 `Field` 上的 `required` 来设置该表单域必填，或者通过 `Field` 的 `rule` 字段来自定义校验逻辑：

```tsx | pure
// ...初始化
const { Field, withForm } = formStore

function Component() {
  return (
    <>
      <Field field="name" label="姓名" required>
        <Input />
      </Field>
      <Field field="name" label="姓名" rule={{ required: true }}>
        <Input />
      </Field>
    </>
  )
}

export default withForm(Component)
```

在提交表单时，可以调用 `useValidate` hook 提供的 `validate` 函数，触发表单的校验：

```tsx | pure
// ...初始化
const { Field, useValidate, withForm } = formStore;

function Component() {
  const { validate } = useValidate

  const handleSubmit = useCallback(async () => {
    const validateRes = await validate()

    if (!validateRes.isPass) {
      return
    }

    // pass
  }, [])

  return (
    <>
      <Field field="name" label="姓名" required>
        <Input />
      </Field>
      <Field field="name" label="姓名" rule={{ required: true }}>
        <Input />
      </Field>
      <div>
        <Button onClick={handleSubmit}>提交</Button>
      </div>
    </>
  )
}

export default withForm(Component)
```

`validate` 函数会返回一个对象，包含 `isPass` 和 `errors` 两个字段：

```ts | pure
{
  isPass: boolean, // 是否校验通过
  errors: { [field: string]: string } // 校验错误的集合
}
```

使用返回的校验结果，可以进行错误提示，或者阻止表单提交。
