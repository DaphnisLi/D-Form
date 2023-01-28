import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message } from 'antd'

export const formStore = createForm()

const { useValues, useValidate, Field, withForm } = formStore

function Component () {
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
    setRules('nameZh', {
      min: 2,
      required: true,
      message: '产品中文名称最少2个字符',
    })
  }

  const handleSetMaxRule = () => {
    setRules('nameZh', {
      max: 16,
      message: '产品中文名称最多不能超过16个字符',
    })
  }

  const handleGetRules = async () => {
    console.log(getRules())
  }

  return (
    <Form style={{ width: 600 }}>

      <Field
        field="nameZh"
        label="产品中文名"
        required
      >
        <Input placeholder="请输入产品中文名称" />
      </Field>

      <div style={{ paddingTop: 20 }}>
        <Button style={{ marginRight: 20 }} type="primary" onClick={handleSubmit}>校验并提交</Button>
        <Button style={{ marginRight: 20 }} onClick={handleSetMinRule}>设置最小长度</Button>
        <Button style={{ marginRight: 20 }} onClick={handleSetMaxRule}>设置最大长度</Button>
        <Button style={{ marginRight: 20 }} onClick={handleGetRules}>打印校验规则</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
