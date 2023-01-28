import { FormValues, UseValues, UseValidate, UseErrors, UseFormMeta } from '../core'
import { Rule } from 'async-validator'

export type RealComponent<T, CProps> = React.ComponentType<CProps> | React.ForwardRefRenderFunction<T, CProps>

export interface BaseStore<VS extends FormValues, FI> {
  withForm: <CP = any, T = React.Component<CP, {}, any>>(Components: RealComponent<T, CP>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<CP> & React.RefAttributes<unknown>>
  Field: <V extends keyof VS> (props: FieldProps<V, FI>) => JSX.Element
  useValues: () => UseValues<VS>
  useSetValues: () => Omit<UseValues<VS>, 'values'>
  useErrors: () => UseErrors
  useSetErrors: () => Omit<UseErrors, 'errors'>
  useValidate: () => UseValidate<VS>
  useFormMeta: () => UseFormMeta
  useNoSubscribeUpdate: () => UseValues<VS>
}

export type FieldProps<VS, FI> = FieldCustomizeProps<VS, FI> & FI

/** 内部 Field 组件自定义参数 */
type FieldCustomizeProps<F, FI> = {
  /** 初始值, 不受控 */
  initialValue?: F
  /** 受控值 */
  value?: F
  /** 字段名, 同样支持 lodash 的 get path */
  field: string
  /** 校验规则 */
  rule?: Rule
  /** 是否展示错误 */
  showError?: boolean
  /** Field 组件卸载时, 同步删除 Rule、Error */
  isDelRulesWhenDestroy?: boolean
  children: React.ReactElement | ((controlProps: FieldChildProps<F>) => React.ReactNode)
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
  wrapper?: React.ComponentType<FI>
}

interface FieldChildProps<F> {
  value: F
  onChange: (value: F) => void
}
