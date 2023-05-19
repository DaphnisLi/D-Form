import React from 'react'
import { Input, Card, Button } from 'antd'
import { BaseStore } from '@daphnis/d-form'
import { BaseFormField } from './index'
import createILikeForm from '../common/createILikeForm'

// 为什么首字母不大写? 准确来说这是一个工厂函数, 不是组件
const createSongForm = (formStore: BaseStore<BaseFormField>) => {
  const ILikeFormComponent = createILikeForm(formStore)
  const { Field, useValues } = formStore
  return () => {
    const namespace = 'song'
    const { values, setValues } = useValues()
    return (
      <>
        <Field
          field={`${namespace}.title`}
          label="歌名"
          required
        >
          <Input />
        </Field>
        <Field
          field={`${namespace}.compose`}
          label="作曲"
          required
        >
          <Input />
        </Field>
        <Field
          field={`${namespace}.writeWords`}
          label="作词"
          required
        >
          <Input />
        </Field>
        <Card title="我喜欢的歌曲">
          {values[namespace].iLike.map((item, index) => <ILikeFormComponent key={index} prefix={`song.iLike[${index}]`} />)}
          <Button
            onClick={() => setValues(draft => {
              draft[namespace].iLike = [...draft[namespace].iLike, { title: '' }]
            })}
          >
            增加一行
          </Button>
        </Card>
      </>
    )
  }
}

export default createSongForm
