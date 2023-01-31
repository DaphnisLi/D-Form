import React from 'react'
import { Input } from 'antd'
import { BaseStore } from '@daphnis/d-form'
import { BaseFormField } from './index'

const createILikeForm = (formStore: BaseStore<BaseFormField>) => {
  const { Field } = formStore
  return (props: { index: number }) => {
    const { index } = props
    const namespace = `song.iLike[${index}]`
    return (
      <Field
        field={`${namespace}.title`}
        label="歌名"
        required
      >
        <Input />
      </Field>
    )
  }
}

export default createILikeForm
