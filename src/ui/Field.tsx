import React, { Children, cloneElement, useCallback, useEffect, useMemo } from 'react'
import { useValues, useErrors, useValidate, useFormMeta, FormValues } from '../core'
import { isObject } from './libs'
import { FieldProps } from './types'
import _ from 'lodash'

export const Field = <VS extends FormValues, K extends keyof VS, FI, F>(props: FieldProps<VS[K], FI, F>) => {
  const {
    initialValue, // 不受控
    field,
    rule,
    showError = true,
    isDelRulesWhenDestroy,
    children,
    pureChildren,
    className,
    valuePropKey = 'value',
    trigger = 'onChange',
    required,
    onChange: onFieldChange,
    wrapper,
  } = props

  const FormItem = wrapper as React.ComponentType<any>
  const { values, setValues, setInitialValues } = useValues()
  const { errors, removeErrors } = useErrors()
  const { setRules, removeRules, validate } = useValidate()
  const { formId } = useFormMeta()

  const value = props?.value || _.get(values, field)

  const error = errors[field]

  useEffect(() => {
    initialValue && setInitialValues(draft => {
      _.set(draft, field, initialValue)
    })
  }, [initialValue, field])

  useEffect(() => {
    if (!rule && !required) return

    const defaultMessage = '不能为空'
    const requiredRule = { required, message: defaultMessage }

    setRules(draft => {
      if (Array.isArray(rule)) {
        draft[field] = [requiredRule, ...rule]
      } else if (isObject(rule!)) {
        draft[field] = [rule!, requiredRule]
      } else {
        draft[field] = requiredRule
      }
    })
  }, [rule, required])

  // 当前组件卸载时, Rule、Error 同步删除
  useEffect(() => () => {
    if (isDelRulesWhenDestroy) {
      removeRules(field)
      removeErrors(field)
    }
  }, [isDelRulesWhenDestroy])

  // 统一的 onChange
  const onChange = useCallback((e) => {
    // 兼容事件
    const value = e?.target ? e.target?.value : e
    // onFieldChange?.(value) || setValues(field, value) 不可以, 因为 onFieldChange 返回值是 void
    onFieldChange ? onFieldChange?.(value) : setValues(field, value)
    validate({
      fields: field,
      callback: (errors) => {
        errors || removeErrors(field)
      },
    })
  }, [field, onFieldChange, setValues])

  // 处理子元素
  const realChildren = useMemo(() => {
    if (pureChildren) {
      return children
    }

    // 代理子元素
    if (typeof children === 'function') {
      return children({ value, onChange })
    }

    // 如果传入一个 JSX[], 那就报错, https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenonly
    Children.only(children)

    return cloneElement(children, { [valuePropKey]: value, [trigger]: onChange })
  }, [value, onChange, pureChildren, children, valuePropKey, trigger])

  // 不需要将某些 props 传给 FormItem 组件, 否则会透传到原始 Form.Item 上引起报错 https://fb.me/react-attribute-behavior
  const excludePropsKeys = ['addItem', 'pureChildren', 'rule', 'isDelRulesWhenDestroy', 'wrapper', 'valuePropKey']
  const formItemProps = _.omit(props, excludePropsKeys)

  return (
    <FormItem
      error={showError && error}
      validateStatus={error && showError && 'error'}
      {...formItemProps}
      className={`d-form-field d-form-field-${formId}-${field}${className ? ` ${className}` : ''}`}
      onChange={() => { }}
    >
      {realChildren}
    </FormItem>
  )
}
