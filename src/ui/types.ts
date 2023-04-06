import { FormValues, UseValues, UseValidate, UseErrors } from '../core'
import { Rule } from 'async-validator'
import { ReactElement, ReactNode, ComponentType, ForwardRefRenderFunction, Component, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import { AntdFieldProps } from '../antd-form'

export type RealComponent<T, CProps> = ComponentType<CProps> | ForwardRefRenderFunction<T, CProps>

export interface BaseStore<VS extends FormValues, FI = AntdFieldProps> {
  withForm: <CP = any, T = Component<CP, {}, any>>(Components: RealComponent<T, CP>) => ForwardRefExoticComponent<PropsWithoutRef<CP> & RefAttributes<unknown>>
  Field: <K extends keyof VS, F> (props: FieldProps<VS[K], FI, F>) => JSX.Element
  useValues: () => UseValues<VS>
  useSetValues: () => Omit<UseValues<VS>, 'values'>
  useErrors: () => UseErrors
  useSetErrors: () => Omit<UseErrors, 'errors'>
  useValidate: () => UseValidate<VS>
}

export type FieldProps<V, FI, F> = FieldCustomizeProps<V, FI, F> & Omit<FI, keyof FieldCustomizeProps<V, FI, F>>

/** 内部 Field 组件自定义参数 */
type FieldCustomizeProps<V, FI, F> = {
  /** 字段名, 同样支持 lodash 的 get path */
  field: string
  children: ReactElement | ((controlProps: FieldChildProps<V>) => ReactNode)

  /** 初始值, 不受控 */
  initialValue?: F
  /** 受控值 */
  value?: F
  /** 校验规则 */
  rule?: Rule
  /** 是否展示错误 */
  showError?: boolean
  /** Field 组件卸载时, 同步删除 Rule、Error */
  isDelRulesWhenDestroy?: boolean
  /** 是否使用原始组件, 设置为 true 则不代理原始组件 */
  pureChildren?: boolean
  className?: string
  /** children 的值, 默认为 value */
  valuePropKey?: string
  /** children 值变更的回调函数, 默认为 onChange */
  trigger?: string
  /** 是否必填 */
  required?: boolean
  onChange?: (value: F) => void
  /** 不对外使用 */
  wrapper?: ComponentType<FI>
  /** 样式 */
  style?: React.CSSProperties
}

interface FieldChildProps<V> {
  value?: V
  onChange: (value: V | null) => void
}
