import { useCallback } from 'react'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState } from './useRecoilState'

/**
 * 此 Hook 不会订阅组件更新, 用法同 useValues
 */
export const useNoSubscribeUpdate = <VS extends FormValues>(): UseValues<VS> => {
  const [values, setValue] = useFromState(valuesState, false)
  const [initialValue, setInitialValue] = useFromState(initialValuesState, false)

  const setValues = useCallback((data, value) => {
    setValue(data, value)
  }, [])

  const resetValues = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  const removeValues = useCallback((fields) => {
    setValue(draft => {
      if (Array.isArray(fields)) {
        fields.forEach(item => {
          delete draft[item]
        })
      } else {
        delete draft[fields]
      }
    })
  }, [])

  const setInitialValues = useCallback((data, value) => {
    setInitialValue(data, value)
  }, [])

  return {
    values,
    setValues,
    resetValues,
    removeValues,
    setInitialValues,
  } as UseValues<VS>
}

