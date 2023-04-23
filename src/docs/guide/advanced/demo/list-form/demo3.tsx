import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Space } from 'antd'
import VirtualList from './VirtualList'

interface ListItem {
  songA: string
  songB: string
}

interface BaseFormField {
  list: ListItem[]
}

export const formStore = createForm<BaseFormField>({
  list: Array.from(new Array(1000), () => ({ songA: '', songB: '' })),
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

  const handleAddItem = () => {
    const newList = values?.list?.concat({ songA: '', songB: '' })
    setValues('list', newList)
  }

  const handleDel = (index: number) => {
    const newList = values?.list?.filter((item, i) => i !== index)
    setValues('list', newList)
  }
  console.log(values.list)
  const columns = [
    {
      dataIndex: 'index',
      title: '序号',
      render: (text, record, index) => {
        return index
      }
    },
    {
      dataIndex: 'songA',
      title: 'songA',
      render: (text, record, index) => {
        return (
          <>
            <Field
              field={`list[${index}].songA`}
            >
              <Input />
            </Field>
          </>
        )
      },
    },
    {
      dataIndex: 'songB',
      title: 'songB',
      render: (text, record, index) => {
        return (
          <>
            <Field
              field={`list[${index}].songB`}
            >
              <Input />
            </Field>
          </>
        )
      },
    },
    {
      dataIndex: 'operate',
      title: '操作',
      render: (text, record, index) => {
        return <Button type="link" onClick={() => handleDel(index)}>删除</Button>
      }
    }
  ]
  return (
    <>
      <VirtualList
        columns={columns}
        dataSource={values.list}
        footer={() => {
          return (
            <Space>
              <Button onClick={handleAddItem}>添加一行</Button>
              <Button onClick={handleSubmit} type="primary">提交</Button>
            </Space>
          )
        }}
        rowHeight={56}
      />
    </>
  )
}

export default withForm(Component)
