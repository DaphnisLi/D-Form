import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message } from 'antd'

export const formStore = createForm()

const { useValues, useErrors, Field, withForm } = formStore

function Component () {
  const { values } = useValues()
  const { errors, setErrors, removeErrors } = useErrors()

  const handleSubmit = async () => {
    if (errors.nameZh) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleSetError1 = () => {
    setErrors('nameZh', '校验错误1')
  }

  const handleSetError2 = () => {
    setErrors({ 'nameZh': '校验错误2' })
  }

  const handleRemoveError = () => {
    removeErrors('nameZh')
  }

  return (
    <Form style={{ width: 600 }}>

      <Field
        field="nameZh"
        label="产品中文名"
      >
        <Input placeholder="请输入产品中文名称" />
      </Field>

      <div style={{ paddingTop: 20 }}>
        <Button style={{ marginRight: 20 }} type="primary" onClick={handleSubmit}>校验并提交</Button>
        <Button style={{ marginRight: 20 }} onClick={handleSetError1}>设置错误1</Button>
        <Button style={{ marginRight: 20 }} onClick={handleSetError2}>设置错误2</Button>
        <Button style={{ marginRight: 20 }} onClick={handleRemoveError}>移除表单错误</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
