import React from 'react'
import { createForm } from '@daphnis/d-form'
import { Button, Input, message, Table, TableColumnProps, Space } from 'antd'

interface ListItem {
  songA: string
  songB: string
  rowKey: number
}

interface BaseFormField {
  list: ListItem[]
}

export const formStore = createForm<BaseFormField>({
  list: [{ songA: '', songB: '', rowKey: 0 }],
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
    const newList = values?.list?.concat({ songA: '', songB: '', rowKey: values?.list.length + 1 })
    setValues('list', newList)
  }

  const handleDel = (index: number) => {
    const newList = values?.list?.filter((item, i) => i !== index)
    setValues('list', newList)
  }

  const columns: TableColumnProps<ListItem>[] = [
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
      <Table
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
        pagination={false}
        style={{ marginBottom: 20 }}
        rowKey={record => record.rowKey}
      />
    </>
  )
}

export default withForm(Component)
