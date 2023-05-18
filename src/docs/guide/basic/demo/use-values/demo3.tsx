import React, { useEffect, useState } from 'react'
import { createForm } from '@daphnis/d-form'
import { Input, Form } from 'antd'
import produce from 'immer'

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

  useEffect(() => {
    console.log('singerA')
  }, [state.singerA])

  useEffect(() => {
    console.log('singerB')
  }, [state.singerB])

  return (
    <Form {...formItemLayout}>
      <Field field="singerA.name" label="歌手A" required>
        <Input />
      </Field>
      <Field field="singerB.name" label="歌手B" required>
        <Input />
      </Field>
      不更新, 因为 setState 执行时会检查传入的数据和之前是否相等, 如果是对象的话只会检查引用是否会发生变化。
      <Input value={state.singerA.name} onChange={(e) => {
        e.persist()
        setState(pre => {
          pre.singerA.name = e.target?.value
          return pre
        })
      }} />
      浅拷贝更新 1
      <br />
      思考一个问题: 如果我们修改的值在更深的层级怎么办? 深拷贝性能差, 浅拷贝要拷贝好几层太麻烦
      <Input value={state.singerB.name} onChange={(e) => {
        e.persist()
        setState(pre => ({ ...pre, singerB: { name: e.target?.value } }))
      }} />
      浅拷贝更新 2
      <br />
      浅拷贝要拷贝好几层太麻烦, 我可以直接修改原对象属性的值再浅拷贝, 但如果有东西基于 singerB 更新, 那就会出现 bug
      <Input value={state.singerB.name} onChange={(e) => {
        e.persist()
        setState(pre => {
          pre.singerB.name = e.target?.value
          return { ...pre }
        })
      }} />
      immer: 返回没有变化的部分且对变化的数据有冻结功能
      <Input value={state.singerB.name} onChange={(e) => {
        e.persist()
        setState(produce((draft) => {
          draft.singerB.name = e.target?.value
        }))
      }} />
    </Form>
  )
}

export default withForm(Component)
