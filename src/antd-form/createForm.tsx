import React from 'react'
import { Form } from 'antd'
import { AntdFieldProps } from './types'
import { createFormFactory } from '../ui/createFormFactory'

// 对 antd 的 FormItem 做一层转化
const FieldWrapper = (props: AntdFieldProps) => <Form.Item {...props} help={props.error} />

export const createForm = createFormFactory(FieldWrapper)
