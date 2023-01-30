import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, InputNumber, Select, Cascader, Rate, Radio, Checkbox, Switch, DatePicker, message, Form, Space } from 'antd'

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

const { useValues, Field, withForm } = formStore

const Component = () => {
  const { values, resetValues } = useValues()

  const handleSubmit = () => {
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleReset = () => {
    resetValues()
  }

  return (
    <Form
      layout="horizontal"
      {...formItemLayout}
    >

      <Field field="input" label="Input">
        <Input />
      </Field>

      <Field field="number" label="Number">
        <InputNumber />
      </Field>

      <Field field="password" label="Password">
        <Input.Password />
      </Field>

      <Field field="select" label="Select">
        <Select>
          <Select.Option value="1">Option1</Select.Option>
          <Select.Option value="2">Option2</Select.Option>
        </Select>
      </Field>

      <Field field="cascader" label="Cascader">
        <Cascader
          options={[{
            value: 'zheJiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangZhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xiHu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          }]}
        />
      </Field>

      <Field field="checkbox" label="Checkbox" valuePropKey="checked">
        <Checkbox>Checkbox</Checkbox>
      </Field>

      <Field field="switch" label="Switch" valuePropKey="checked">
        <Switch />
      </Field>

      <Field field="radio" label="Radio">
        <Radio.Group>
          <Radio value="A">A</Radio>
          <Radio value="B">B</Radio>
          <Radio value="C">C</Radio>
          <Radio value="D">D</Radio>
        </Radio.Group>
      </Field>

      <Field field="datePicker" label="DatePicker">
        <DatePicker />
      </Field>

      <Field field="rate" label="Rate">
        <Rate />
      </Field>

      <Space size="large">
        <Button type="primary" onClick={handleSubmit}>提交</Button>
        <Button onClick={handleReset}>重置</Button>
      </Space>
    </Form>
  )
}

export default withForm(Component)
