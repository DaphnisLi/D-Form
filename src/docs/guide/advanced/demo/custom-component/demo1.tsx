import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form } from 'antd'
import { SongSelect } from './SongSelect'

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
  songTitle?: number
}

export const formStore = createForm<FormState>()

const { useValues, useValidate, Field, withForm } = formStore

const Component = () => {
  const { values } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()

    if (!validateRes.isPass) {
      return
    }
    console.log(values)
  }

  return (
    <Form {...formItemLayout}>
      <Field field="songTitle" label="歌名" required>
        <SongSelect />
      </Field>

      <Button className="mr15" type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}

export default withForm(Component)
