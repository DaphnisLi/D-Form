import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, InputNumber, Select, Cascader, Rate, Radio, Checkbox, Switch, DatePicker, message, Form } from 'antd'

export const formStore = createForm()

const { useValues, Field, withForm } = formStore

function Component () {
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
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 400 }}
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
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
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

      <Field field="datepicker" label="DatePicker">
        <DatePicker />
      </Field>

      <Field field="rate" label="Rate">
        <Rate />
      </Field>

      <div>
        <Button style={{ marginRight: 20 }} type="primary" onClick={handleSubmit}>提交</Button>
        <Button style={{ marginRight: 20 }} onClick={handleReset}>重置</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
