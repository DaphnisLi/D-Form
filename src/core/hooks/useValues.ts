import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState, useSetFromState } from './useRecoilState'

export const useSetValues = <VS extends FormValues>(): Omit<UseValues<VS>, 'values'> => {
  const setValue = useSetFromState(valuesState)
  const [initialValue, setInitialValue] = useFromState(initialValuesState)

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
    setValues,
    resetValues,
    removeValues,
    setInitialValues,
  }
}

export const useValues = <VS extends FormValues>(): UseValues<VS> => {
  const values = useRecoilValue(valuesState) as VS
  return {
    values,
    ...useSetValues(),
  }
}
