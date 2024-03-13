import { useCallback } from 'react'
import { useRecoilCallback, useSetRecoilState } from 'recoil'
import {
  UseValidate,
  FormValues,
  FormErrors,
  HandleValidate,
  ValidateResult,
} from '../types'
import Validator from 'async-validator'
import { rulesState, formIdState, errorsState, valuesState, validateValuesState } from '../states'
import { useErrors } from './useErrors'
import { pick, cloneDeep } from 'lodash-es'

export const useValidate = <VS extends FormValues>(): UseValidate<VS> => {
  const setOriginRule = useSetRecoilState(rulesState)
  const { setErrors, resetErrors } = useErrors()

  const setOriginValidateValues = useSetRecoilState<FormValues>(validateValuesState)

  const setValidateValues = useCallback((field: string, value: any) => {
    setOriginValidateValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const getRules: UseValidate<VS>['getRules'] = useRecoilCallback(({ snapshot }) => async (fields) => {
    const originRules = await snapshot.getPromise(rulesState)
    return fields ? pick(originRules, fields) : originRules
  }, [])

  const setRules: UseValidate<VS>['setRules'] = useCallback((field, rule) => {
    setOriginRule((rules) => {
      const newRules = cloneDeep(rules)
      newRules[field] = rule
      return newRules
    })
  }, [])

  const removeRules: UseValidate<VS>['removeRules'] = useCallback((fields) => {
    setOriginRule((rules) => {
      const newRules = cloneDeep(rules)
      if (Array.isArray(fields)) {
        fields.forEach(field => {
          delete newRules[field]
        })
      } else {
        delete newRules[fields]
      }
      return newRules
    })
  }, [])

  const scrollErrors = useRecoilCallback(({ snapshot }) => async (errs: FormErrors, scrollToErrorOffsetTop?: string) => {
    const formId = await snapshot.getPromise(formIdState)

    let firstDom: HTMLElement
    let firstTop: number
    const errors = errs
    // 找到最上面的 dom
    Object.keys(errors).forEach(field => {
      const dom = document.getElementsByClassName(`d-form-field-${formId}-${field}`)?.[0] as HTMLElement
      if (dom) {
        const top = dom.getBoundingClientRect().top
        if (!firstTop || firstTop > top) {
          firstTop = top
          firstDom = dom
        }
      }
    })
    if (firstDom!) {
      firstDom.style.scrollMarginTop = scrollToErrorOffsetTop!
      firstDom.scrollIntoView()
    }
  }, [])

  const handleValidate: HandleValidate<VS> = useRecoilCallback(({ snapshot }) => async (option) => {
    const { fields, callback = () => { }, isResetErr = false, isScroll = false, scrollToErrorOffsetTop } = option
    const rules = await snapshot.getPromise(rulesState)
    const values = await snapshot.getPromise(valuesState)
    const errors = await snapshot.getPromise(errorsState)
    const originValidateValues = await snapshot.getPromise(validateValuesState)

    const allFields = Object.keys(rules)
    const validateValues = allFields.reduce((pre, cur) => ({ ...pre, [cur]: originValidateValues[cur] }), {})

    // fields 为空就校验全部字段
    const currentRules = fields ? pick(rules, fields) : rules
    const currentValidateValues = fields ? pick(validateValues, fields) : validateValues

    // 排除掉空 rule, 其实是没有这种情况, 但 core 后面可能会做成一个 npm 包, 所以还是要做校验
    for (const key in currentRules) {
      if (!currentRules[key]) {
        delete currentRules[key]
      }
    }

    const validator = new Validator(currentRules)
    const beforeErr = errors

    return validator.validate(currentValidateValues, (errors) => {
      if (errors) {
        const errs = errors.reduce((pre, cur) => {
          return { ...pre, [cur.field!]: cur.message! }
        }, isResetErr ? {} : beforeErr)

        setErrors(errs)
        isScroll && scrollErrors(errs, scrollToErrorOffsetTop)
      } else {
        if (isResetErr) {
          resetErrors()
        } else {
          const removeErrorKeys = fields || Object.keys(beforeErr)
          setErrors(errs => {
            for (const field of removeErrorKeys) {
              delete errs[field]
            }
          })
        }
      }
      callback(errors, values as VS)
    })
      .then(() => ({ isPass: true }))
      .catch((err: Omit<ValidateResult, 'isPass'>) => {
        const { errors, fields } = err
        if (!errors && !fields) {
          throw err
        }

        return { errors, fields, isPass: !errors }
      })
  }, [])

  const validate: UseValidate<VS>['validate'] = useCallback((option) => {
    return handleValidate({
      ...option,
      fields: option?.fields && (Array.isArray(option.fields) ? option.fields : [option.fields]),
      isResetErr: option?.isResetErr || !option?.fields,
      isScroll: false,
    })
  }, [])

  const validateAndScroll: UseValidate<VS>['validateAndScroll'] = useCallback((option) => {
    return handleValidate({
      ...option,
      fields: option?.fields && (Array.isArray(option.fields) ? option.fields : [option.fields]),
      isResetErr: option?.isResetErr || !option?.fields,
      isScroll: true,
    })
  }, [])

  return {
    getRules,
    setRules,
    removeRules,
    validate,
    validateAndScroll,
    setValidateValues,
  }
}
