import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Form, Space } from 'antd'

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
        label="歌名(默认 value、onChange)"
        required
      >
        <Input />
      </Field>
      <Field
        field="compose"
        label="作曲(自定义 value、onChange), 联动作词"
        value={values?.song?.compose}
        onChange={(v) => {
          setValues((values) => {
            values['song.compose'] = v
            values['song.writeWords'] = `${Math.random()}`
          })
        }}
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
      <Space>
        <Button onClick={() => setValues('songTitle', `${Math.random()}`)}>修改歌名</Button>
        <Button onClick={handleSubmit} type="primary">提交</Button>
        表单值: {JSON.stringify(values)}
      </Space>
    </Form>
  )
}

export default withForm(Component)
