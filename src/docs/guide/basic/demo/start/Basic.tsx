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

const formStore = createForm<FormState>()
const { useValues, useValidate, Field, withForm } = formStore

const Basic = () => {
  const { values } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()

    if (!validateRes.isPass) {
      return message.error('表单校验失败')
    }

    message.info(`提交成功 (歌手: ${values.singer}, 歌名${values.songTitle})`)
  }

  const option = [
    {
      value: '告白气球',
      label: '告白气球',
    },
    {
      value: '等你下课',
      label: '等你下课',
    },
  ]

  return (
    <Form {...formItemLayout}>
      <Field
        field="singer"
        label="歌手"
        required
        rule={{
          validator: (rule, value, callback) => {
            if (value === '周杰伦') {
              callback()
            } else {
              callback('歌手名称错误')
            }
          },
        }}
      >
        <Input />
      </Field>

      <Field field="songTitle" label="歌名" required>
        <Select>
          {option.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
        </Select>
      </Field>

      <div>
        <Button className="mr15" type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </Form>
  )
}

export default withForm(Basic)
