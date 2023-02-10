import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import {
  UseValidate,
  FormValues,
  Validate,
  ValidateAndScroll,
  FormErrors,
  HandleValidate,
  ValidateResult,
} from '../types'
import Validator from 'async-validator'
import { rulesState, formIdState, errorsState, valuesState } from '../states'
import { useFromState } from './useRecoilState'
import { useErrors } from './useErrors'
import _ from 'lodash'

export const useValidate = <VS extends FormValues>(): UseValidate<VS> => {
  const [originRules, setOriginRule] = useFromState(rulesState, false)
  const { setErrors, resetErrors } = useErrors()

  const getRules = useCallback((fields) => {
    return fields ? _.pick(originRules, fields) : originRules
  }, [originRules])

  const setRules = useCallback((data, value) => {
    setOriginRule(data, value)
  }, [setOriginRule])

  const removeRules = useCallback(fields => {
    setOriginRule((draft) => {
      if (Array.isArray(fields)) {
        fields.forEach(field => {
          delete draft[field]
        })
      } else {
        delete draft[fields]
      }
    })
  }, [setOriginRule])

  const scrollErrors = useRecoilCallback(({ snapshot }) => async (errs: FormErrors) => {
    const formId = await snapshot.getPromise(formIdState)

    let firstDom: Element
    let firstTop: number
    const errors = errs
    // 找到最上面的 dom
    Object.keys(errors).forEach(field => {
      const dom = document.getElementsByClassName(`d-form-field-${formId}-${field}`)?.[0]
      if (dom) {
        const top = dom.getBoundingClientRect().top
        if (!firstTop || firstTop > top) {
          firstTop = top
          firstDom = dom
        }
      }
    })
    firstDom! && firstDom.scrollIntoView()
  }, [])

  const handleValidate: HandleValidate<VS> = useRecoilCallback(({ snapshot }) => async (option) => {
    const { fields, callback = () => { }, isResetErr = false, isScroll = false } = option
    const rules = await snapshot.getPromise(rulesState)
    const values = await snapshot.getPromise(valuesState)
    const errors = await snapshot.getPromise(errorsState)
    const allFields = Object.keys(rules)
    const validateValues = allFields.reduce((pre, cur) => ({ ...pre, [cur]: _.get(values, cur) }), {})

    // fields 为空就校验全部字段
    const currentRules = fields ? _.pick(rules, fields) : rules
    const currentValidateValues = fields ? _.pick(validateValues, fields) : validateValues

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
        isScroll && scrollErrors(errs)
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
  }, [scrollErrors])

  const validate: Validate<VS> = useCallback((option) => {
    return handleValidate({
      fields: option?.fields && (Array.isArray(option.fields) ? option.fields : [option.fields]),
      callback: option?.callback,
      isResetErr: option?.isResetErr || !option?.fields,
      isScroll: false,
    })
  }, [handleValidate])

  const validateAndScroll: ValidateAndScroll<VS> = useCallback((option) => {
    return handleValidate({
      fields: option?.fields && (Array.isArray(option.fields) ? option.fields : [option.fields]),
      callback: option?.callback,
      isResetErr: option?.isResetErr || !option?.fields,
      isScroll: true,
    })
  }, [handleValidate])

  return {
    getRules,
    setRules,
    removeRules,
    validate,
    validateAndScroll,
  }
}
