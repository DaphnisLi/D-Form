import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Form } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
}

interface BaseFormField {
  songTitle: string
  song: {
    compose: string
    writeWords: string
  }
}

export const formStore = createForm<BaseFormField>()

const { useValues, useValidate, Field, withForm } = formStore

const Component = () => {
  const { values, setValues } = useValues()
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
        field="songTitle"
        label="歌名"
        required
      >
        <Input />
      </Field>
      <Field
        field="compose"
        label="作曲"
        value={values?.song?.compose}
        onChange={(v) => setValues('song.compose', v)}
        required
      >
        <Input />
      </Field>
      <Field
        field="song.writeWords"
        label="作词"
        required
      >
        <Input />
      </Field>
      <Field
        field="noCompose"
        label="我偏不改 compose, 就要改 writeWords"
        value={values?.song?.writeWords}
        onChange={(v) => setValues('song.writeWords', v)}
        required
      >
        <Input />
      </Field>
      <Button onClick={handleSubmit} type="primary">提交</Button>
    </Form>
  )
}

export default withForm(Component)
