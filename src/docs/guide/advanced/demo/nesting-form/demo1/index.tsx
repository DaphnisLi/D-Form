import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Form } from 'antd'
import createSongForm from './createSongForm'

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 15,
  },
  labelAlign: 'left' as const,
}

export interface BaseFormField {
  singer: string
  song: {
    title: string
    compose: string
    writeWords: string
    iLike: {
      title: string
    }[]
  }
}

export const formStore = createForm<BaseFormField>(
  {
    singer: '周杰伦',
    song: {
      title: '一点点',
      compose: '周杰伦',
      writeWords: '方文山',
      iLike: [
        {
          title: '一点点',
        },
        {
          title: '晴天',
        },
      ]
    }
  }
)

const { useValues, useValidate, Field, withForm } = formStore

const SongFormComponent = createSongForm(formStore)

const Component = () => {
  const { values } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()

    if (!validateRes.isPass) {
      return
    }
    message.info('提交成功')
  }
  console.log(values)
  return (
    <Form {...formItemLayout}>
      <Field
        field="singer"
        label="歌手"
        required
      >
        <Input />
      </Field>
      <SongFormComponent />
      <Button style={{ marginTop: 20 }} onClick={handleSubmit} type="primary">提交</Button>
    </Form>
  )
}

export default withForm(Component)
