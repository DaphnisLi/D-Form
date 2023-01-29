import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState } from './useRecoilState'
import _ from 'lodash'

/**
 * 此 Hook 不会订阅组件更新, 用法同 useValues
 */
export const useNoSubscribeUpdate = <VS extends FormValues>(): UseValues<VS> => {
  const [originValues, , setOriginValues] = useFromState(valuesState, false)
  const [originInitialValues, , setOriginInitialValues] = useFromState(initialValuesState, false)

  const setValues = useCallback((data, value) => {
    setOriginValues(data, value)
  }, [])

  const resetValues = useRecoilCallback(({ set }) => async () => {
    set(valuesState, draft => {
      const initialValues = _.cloneDeep(originInitialValues)
      for (const key in draft) {
        delete draft[key]
        if (initialValues[key]) {
          draft[key] = initialValues[key]
        }
      }
      return draft
    })
  }, [originInitialValues])

  const removeValues = useCallback((fields) => {
    setOriginValues(draft => {
      if (Array.isArray(fields)) {
        fields.forEach(item => {
          _.set(draft, item, undefined)
        })
      } else {
        _.set(draft, fields, undefined)
      }
    })
  }, [])

  const setInitialValues = useCallback((data, value) => {
    setOriginInitialValues(data, value)
  }, [])

  return {
    initialValues: originInitialValues,
    values: originValues,
    setValues,
    resetValues,
    removeValues,
    setInitialValues,
  } as unknown as UseValues<VS>
}

