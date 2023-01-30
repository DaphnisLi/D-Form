import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Row, Col, Form } from 'antd'

interface ListItem {
  songA: string
  songB: string
}

interface BaseFormField {
  list: ListItem[]
}

export const formStore = createForm<BaseFormField>({
  list: [{ songA: '', songB: '' }],
})

const { useValues, useValidate, Field, withForm } = formStore

const Component = () => {
  const { values, setValues } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()
    if (!validateRes.isPass) {
      return
    }
    message.info('提交成功')
  }
  console.log(values)

  const handleAddItem = () => {
    const newList = values?.list?.concat({ songA: '', songB: '' })
    setValues('list', newList)
  }

  const handleDel = (index: number) => {
    const newList = values?.list?.filter((item, i) => i !== index)
    setValues('list', newList)
  }

  return (
    <Form>
      {values?.list.map((item: ListItem, index: number) => {
        return (
          // 非必要不推荐用 index 做 key, 因为没作用
          <Row gutter={24} key={index}>
            <Col span={8}>
              <Field
                label="songA"
                field={`list[${index}].songA`}
              >
                <Input />
              </Field>
            </Col>
            <Col span={8}>
              <Field
                label="songB"
                field={`list[${index}].songB`}
              >
                <Input />
              </Field>
            </Col>
            <Col span={8}>
              <Button type="link" onClick={() => handleDel(index)}>删除</Button>
            </Col>
          </Row>
        )
      })}
      <Button onClick={handleAddItem} style={{ marginRight: 20, marginTop: 20 }}>添加一行</Button>
      <Button onClick={handleSubmit} type="primary">提交</Button>
    </Form>
  )
}

export default withForm(Component)
