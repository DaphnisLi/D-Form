---
group:
  path: /basic
  title: 基础
  order: 2
title: 快速上手
order: 1
---


# 快速上手

### 简单示例

<code src="./demo/start/Basic.tsx"></code>

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

### 表单数据

##### 1、获取表单数据
```tsx | pure
// ...
function Component() {
  const { values } = useValues()

  console.log(values) // { songTitle: '告白气球' }
}
```

##### 2、修改表单数据
setValues 可以自动聚合其他属性, 和 class 的 this.setState 类似

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
required 设置字段为必填

```tsx | pure
// ...初始化
const { Field, withForm } = formStore

function Component() {
  return (
    <>
      <Field field="singer" label="歌手" required>
        <Input />
      </Field>
      <Field field="songTitle" label="歌名" rule={{ required: true }}>
        <Input />
      </Field>
    </>
  )
}

export default withForm(Component)
```

在提交表单时, 可以调用 `useValidate` hook 提供的 `validate` 函数，触发表单的校验：

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
  }, [])

  return (
    <>
      <Field field="singer" label="歌手" required>
        <Input />
      </Field>
      <Field field="songTitle" label="歌名" rule={{ required: true }}>
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
