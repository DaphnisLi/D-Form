import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message, Space } from 'antd'

export const formStore = createForm()

const { useValues, useValidate, Field, withForm } = formStore

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

const Component = () => {
  const { values, resetValues } = useValues()
  const { getRules, validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()
    if (!validateRes.isPass) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleReset = () => {
    resetValues()
  }

  const handleGetRules = async () => {
    console.log(getRules())
  }

  return (
    <Form {...formItemLayout}>
      <Field
        field="singerZh"
        label="歌手中文名"
        required
        rule={{
          validator: (rule, value, cb) => {
            if (value === '周杰伦') {
              cb()
            } else {
              cb('填写错误')
            }
          },
        }}
      >
        <Input />
      </Field>

      <Field
        field="singerEn"
        label="歌手英文名"
        rule={{
          validator: (rule, value, cb) => {
            if (value === 'Jay') {
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
        <Button onClick={handleReset}>重置表单值</Button>
        <Button onClick={handleGetRules}>打印校验规则</Button>
      </Space>
    </Form>
  )
}

export default withForm(Component)
