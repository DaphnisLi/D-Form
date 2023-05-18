import React, { useState } from 'react'
import { createForm } from '@daphnis/d-form'
import { Input, Form } from 'antd'
// import { produce } from 'immer'

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

interface FormState {
  singerA: {
    name: string
  }
  singerB: {
    name: string
  }
}

export const formStore = createForm<FormState>({ singerA: { name: '' }, singerB: { name: '' } })

const { useValues, Field, withForm } = formStore

const Component = () => {
  const { values } = useValues()
  const [state, setState] = useState({ singerA: { name: '' }, singerB: { name: '' } })

  console.log(values, state)

  return (
    <Form {...formItemLayout}>
      <Field field="singerA.name" label="歌手A" required>
        <Input />
      </Field>
      <Field field="singerB.name" label="歌手B" required>
        <Input />
      </Field>
      不更新, 因为 setState 执行时会检查传入的数据是否和之前不一样, 如果是对象的话只会检查引用是否会发生变化。
      <Input value={state.singerA.name} onChange={(e) => {
        e.persist()
        setState(pre => {
          pre.singerA.name = e.target?.value
          return pre
        })
      }} />
      更新: 因为浅拷贝了
      <br />
      思考一个问题: 如果我们修改的值在更深的层级怎么办? 一层一层拷贝下去吗? 岂不是非常麻烦
      <Input value={state.singerB.name} onChange={(e) => {
        e.persist()
        setState(pre => ({ ...pre, singerB: { name: e.target?.value } }))
        // setState(produce((draft) => {
        //   draft.singerB.name = e.target?.value
        // }))
      }} />
    </Form>
  )
}

export default withForm(Component)
