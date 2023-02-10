import { FormItemProps } from 'antd/lib/form/FormItem'

export interface AntdFieldProps extends Omit<FormItemProps, 'help'> {
  error?: string
}
