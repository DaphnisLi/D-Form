import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message, Space } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

export const formStore = createForm()

const { useValidate, useValues, Field, withForm } = formStore

const Component = () => {
  const { values, resetValues } = useValues()
  const { validateAndScroll } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validateAndScroll({
      scrollToErrorOffsetTop: '100px',
    })
    if (!validateRes.isPass) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleReset = () => {
    resetValues()
  }

  const effectiveName = ['我落泪情绪零碎', '还在流浪', '哪里都是你']

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
            if (effectiveName.includes(value)) {
              cb('歌名不能重复')
            } else {
              cb()
            }
          },
        }}
        required
      >
        <Input />
      </Field>

      <Space size="large" style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleSubmit}>校验</Button>
        <Button onClick={handleReset}>重置表单值和错误</Button>
      </Space>
    </Form>
  )
}

export default withForm(Component)
