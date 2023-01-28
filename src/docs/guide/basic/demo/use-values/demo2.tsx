import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, Select, message, Form } from 'antd'

interface FormState {
  name?: string
  sex?: string
}

export const formStore = createForm<FormState>({ name: 'Jason', sex: '男' })

const { useValues, Field, withForm } = formStore

function Component () {
  const { values, initialValues, setValues, removeValues, resetValues } = useValues()

  const handleGetValues = () => {
    message.info(JSON.stringify(values))
  }

  const handleGetInitialValues = () => {
    message.info(JSON.stringify(initialValues))
  }

  const handleSetValues = () => {
    setValues({ name: 'Pony' })
  }

  const handleResetName = () => {
    removeValues('name')
  }

  const handleResetValues = () => {
    resetValues()
  }

  return (
    <Form style={{ width: 800 }}>
      <Field field="name" label="姓名" required>
        <Input />
      </Field>

      <Field field="sex" label="性别" required>
        <Select>
          <Select.Option value="男">男</Select.Option>
          <Select.Option value="女">女</Select.Option>
        </Select>
      </Field>

      <div>
        <Button style={{ marginRight: 20 }} onClick={handleGetValues}>获取当前值</Button>
        <Button style={{ marginRight: 20 }} onClick={handleGetInitialValues}>获取初始值</Button>
        <Button style={{ marginRight: 20 }} onClick={handleSetValues}>设置姓名为 Pony</Button>
        <Button style={{ marginRight: 20 }} onClick={handleResetName}>移除姓名</Button>
        <Button style={{ marginRight: 20 }} onClick={handleResetValues}>重置所有字段</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
