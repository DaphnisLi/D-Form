import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, InputNumber, message } from 'antd'

export const formStore = createForm()

const { useValues, useValidate, Field, withForm } = formStore

function Component () {
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
    <Form style={{ width: 500 }}>
      <Field
        field="nameZh"
        label="产品中文名"
        rule={[
          {
            required: true,
            message: '产品中文名称不能为空',
          },
          {
            min: 2,
            message: '产品中文名称最少2个字符',
          },
          {
            max: 16,
            message: '产品中文名称最多不能超过16个字符',
          },
        ]}
      >
        <Input placeholder="请输入产品中文名称" />
      </Field>

      <Field
        field="url"
        label="产品链接"
        rule={[{
          pattern: /^https?:\/\//,
          message: '产品链接必须以http://或https://开头',
        }]}
        required
      >
        <Input placeholder="请输入产品链接" />
      </Field>

      <Field
        field="count"
        label="数量"
        rule={{
          validator: (rule, value) => value > 0 && value <= 100,
          message: '数量必须为正数且最大不能超过100',
        }}
        required
      >
        <InputNumber />
      </Field>

      <div style={{ paddingTop: 20 }}>
        <Button style={{ marginRight: 20 }} type="primary" onClick={handleSubmit}>校验并提交</Button>
        <Button style={{ marginRight: 20 }} onClick={handleReset}>重置表单值</Button>
        <Button style={{ marginRight: 20 }} onClick={handleGetRules}>打印校验规则</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
