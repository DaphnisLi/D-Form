import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Form, Input, message } from 'antd'

export const formStore = createForm()

const { useValidate, useValues, Field, withForm } = formStore

function Component () {
  const { values, resetValues } = useValues()
  const { validate } = useValidate()

  const handleSubmit = async () => {
    const validateRes = await validate()
    if (!validateRes.isPass) {
      return message.error('表单值校验错误')
    }
    message.info(`表单值：${JSON.stringify(values)}`)
  }

  const handleReset = () => {
    resetValues()
  }

  const effectiveName = ['cvm', 'tke', 'lighthouse']

  return (
    <Form style={{ width: 500 }}>

      <Field
        field="nameZh"
        label="产品中文名"
        rule={{
          asyncValidator: async (rule, value, cb) => new Promise(() => {
            setTimeout(() => {
              if (effectiveName.includes(value)) {
                cb('产品中文名称不能重复')
              } else {
                cb()
              }
            }, 1000)
          }),
        }}
        required
      >
        <Input placeholder="请输入产品中文名称" />
      </Field>

      <div style={{ paddingTop: 20 }}>
        <Button style={{ marginRight: 20 }} type="primary" onClick={handleSubmit}>异步校验</Button>
        <Button style={{ marginRight: 20 }} onClick={handleReset}>重置表单值和错误</Button>
      </div>
    </Form>
  )
}

export default withForm(Component)
