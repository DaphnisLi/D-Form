import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, Select, message, Form } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

interface FormState {
  singer?: string
  songTitle?: string
}

export const formStore = createForm<FormState>({ singer: '周杰伦', songTitle: '花海' })

const { useValues, Field, withForm } = formStore

const Component = () => {
  const { values, initialValues, setValues, removeValues, resetValues } = useValues()

  const handleGetValues = () => {
    message.info(JSON.stringify(values))
  }

  const handleGetInitialValues = () => {
    message.info(JSON.stringify(initialValues))
  }

  const handleSetValues = () => {
    setValues({ singer: 'Jay' })
  }

  const handleResetName = () => {
    removeValues('singer')
  }

  const handleResetValues = () => {
    resetValues()
  }

  const option = [
    {
      value: '花海',
      label: '花海',
    },
    {
      value: '说好不哭',
      label: '说好不哭',
    },
  ]

  return (
    <Form {...formItemLayout}>
      <Field field="singer" label="歌手" required>
        <Input />
      </Field>

      <Field field="songTitle" label="歌名" required>
        <Select>
          {option.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
        </Select>
      </Field>

      <div>
        <Button onClick={handleGetValues}>获取当前值</Button>
        <Button onClick={handleGetInitialValues}>获取初始值</Button>
        <Button onClick={handleSetValues}>设置歌手为 Jay</Button>
        <Button onClick={handleResetName}>移除歌手</Button>
        <Button onClick={handleResetValues}>重置所有字段</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
