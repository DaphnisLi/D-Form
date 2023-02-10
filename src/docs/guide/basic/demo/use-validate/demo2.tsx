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

const { useValues, useValidate, Field, withForm } = formStore

const Component = () => {
  const { values } = useValues()
  const { getRules, validate, setRules } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()
    if (!validateRes.isPass) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleSetMinRule = () => {
    setRules('songTitle', {
      min: 1,
      required: true,
      message: '歌名最少1个字符',
    })
  }

  const handleSetMaxRule = () => {
    setRules('songTitle', {
      max: 8,
      message: '歌名最多不能超过8个字符',
    })
  }

  const handleGetRules = async () => {
    console.log(getRules())
  }

  return (
    <Form {...formItemLayout}>

      <Field
        field="songTitle"
        label="歌名"
        required
      >
        <Input />
      </Field>

      <Space size="large" style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleSubmit}>校验并提交</Button>
        <Button onClick={handleSetMinRule}>设置最小长度</Button>
        <Button onClick={handleSetMaxRule}>设置最大长度</Button>
        <Button onClick={handleGetRules}>打印校验规则</Button>
      </Space>
    </Form>
  )
}

export default withForm(Component)
