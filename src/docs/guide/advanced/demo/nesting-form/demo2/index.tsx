import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Form } from 'antd'
import createILikeForm from '../common/createILikeForm'

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

interface ILike {
  title: string
}

export interface BaseFormField {
  singer: string
  iLike: ILike
}

export const formStore = createForm<BaseFormField>(
  {
    singer: '周杰伦',
    iLike: {
      title: '一点点',
    }
  }
)

const { useValues, useValidate, Field, withForm } = formStore

const ILikeForm = createILikeForm(formStore)

const Component = () => {
  const { values } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()

    if (!validateRes.isPass) {
      return
    }
    message.info('提交成功')
  }
  console.log(values)
  return (
    <Form {...formItemLayout}>
      <Field
        field="singer"
        label="歌手"
        required
      >
        <Input />
      </Field>
      <ILikeForm prefix="iLike" />
      <Button style={{ marginTop: 20 }} onClick={handleSubmit} type="primary">提交</Button>
    </Form>
  )
}

export default withForm(Component)
