import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState } from './useRecoilState'

/**
 * 此 Hook 不会订阅组件更新, 用法同 useValues
 */
export const useNoSubscribeUpdate = <VS extends FormValues>(): UseValues<VS> => {
  const [originValues, setOriginValues] = useFromState(valuesState, false)
  const [originInitialValues, setOriginInitialValues] = useFromState(initialValuesState, false)

  const setValues = useCallback((data, value) => {
    setOriginValues(data, value)
  }, [])

  const resetValues = useRecoilCallback(({ set }) => async () => {
    set(valuesState, (draft) => {
      for (const key in draft) {
        delete draft[key]
        if (originInitialValues[key]) {
          draft[key] = originInitialValues[key]
        }
      }
      return draft
    })
  }, [originInitialValues])

  const removeValues = useCallback((fields) => {
    setOriginValues(draft => {
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
