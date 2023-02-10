import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message, Space } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

export const formStore = createForm()

const { useValues, useErrors, Field, withForm } = formStore

const Component = () => {
  const { values } = useValues()
  const { errors, setErrors, removeErrors } = useErrors()

  const handleSubmit = async () => {
    if (errors.nameZh) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleSetError1 = () => {
    setErrors('songTitle', '校验错误1')
  }

  const handleSetError2 = () => {
    setErrors({ 'songTitle': '校验错误2' })
  }

  const handleRemoveError = () => {
    removeErrors('songTitle')
  }

  return (
    <Form {...formItemLayout}>

      <Field
        field="songTitle"
        label="歌名"
        rule={{
          validator: (rule, value, cb) => {
            if (value === '安静') {
              cb()
            } else {
              cb('填写错误')
            }
          },
        }}
        required
      >
        <Input />
      </Field>

      <Space size="large" style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleSubmit}>校验并提交</Button>
        <Button onClick={handleSetError1}>设置错误1</Button>
        <Button onClick={handleSetError2}>设置错误2</Button>
        <Button onClick={handleRemoveError}>移除表单错误</Button>
      </Space>
    </Form>
  )
}

export default withForm(Component)
