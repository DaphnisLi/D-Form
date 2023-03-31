import { ValidateError, Rule } from 'async-validator'
import { Draft } from 'immer'


export type SetData<D> = <K extends keyof Draft<D>> (data: string | K | Partial<D> | ((draft: Draft<D>) => void | D), value?: Draft<D>[K]) => void

export interface FormValues {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: string
}

export interface FormValidateValues {
  [key: string]: any
}

export type FormRules = { [key: string]: Rule }


export type ValidateCallback<VS> = (errors?: ValidateError[] | null, values?: VS) => void

export interface FieldErrorList {
  [field: string]: ValidateError[]
}
export interface ValidateResult { errors?: ValidateError[], fields?: FieldErrorList, isPass: boolean }

export interface ValidateOption<VS> {
  /** 校验指定的 field, 不传则校验全部, 要以 Field 填写的 field 字段为准 */
  fields?: string | string[]
  /** 回调函数 */
  callback?: ValidateCallback<VS>
  /** 是否重置之前的校验错误 */
  isResetErr?: boolean
  /** 是否在校验失败时自动滚动到错误 field */
  isScroll?: boolean

  // ? 未来可能支持
  /** 校验多个 field 和对应表单值 */
  // fieldsValue?: { [key: string]: any }
  /** 排除在外的多个 field */
  // excludeFields?: string[]
}

export type Validate<VS> = (option?: Omit<ValidateOption<VS>, 'isScroll'>) => Promise<ValidateResult>
export type ValidateAndScroll<VS> = (option?: ValidateOption<VS>) => Promise<ValidateResult>

export type HandleValidate<VS> = (option: ValidateOption<VS>) => Promise<ValidateResult>

export interface UseValues<VS extends FormValues> {
  initialValues: VS
  values: VS
  setValues: SetData<VS>
  resetValues: () => void
  removeValues: (fields: string | string[]) => void
  setInitialValues: SetData<VS>
}

export interface UseErrors {
  errors: FormErrors
  setErrors: SetData<FormErrors>
  resetErrors: () => void
  removeErrors: (fields: string | string[]) => void
}

export interface UseValidate<VS extends FormValues> {
  getRules: (fields?: string | string[]) => FormRules
  setRules: (field: string, rule: Rule) => void
  removeRules: (fields: string | string[]) => void
  validate: Validate<VS>
  validateAndScroll: ValidateAndScroll<VS>
}

export interface UseFormMeta {
  formId: string
}

