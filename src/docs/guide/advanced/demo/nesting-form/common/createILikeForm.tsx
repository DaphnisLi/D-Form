import React from 'react'
import { Input } from 'antd'
import { BaseStore } from '@daphnis/d-form'

const createILikeForm = (formStore: BaseStore<any>) => {
  const { Field } = formStore
  return (props: { prefix: string }) => {
    const { prefix } = props
    return (
      <Field
        field={`${prefix}.title`}
        label="歌名"
        required
      >
        <Input />
      </Field>
    )
  }
}

export default createILikeForm
