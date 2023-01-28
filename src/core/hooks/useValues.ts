import { useCallback } from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState, useSetFromState } from './useRecoilState'

export const useSetValues = <VS extends FormValues>(): Omit<UseValues<VS>, 'values' | 'initialValues'> => {
  const setOriginValues = useSetFromState(valuesState)
  const [originInitialValues, setOriginInitialValues] = useFromState(initialValuesState)

  const setValues = useCallback((data, value) => {
    setOriginValues(data, value)
  }, [])

  const resetValues = useRecoilCallback(({ set }) => async () => {
    set(valuesState, originInitialValues)
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
    setValues,
    resetValues,
    removeValues,
    setInitialValues,
  }
}

export const useValues = <VS extends FormValues>(): UseValues<VS> => {
  const values = useRecoilValue(valuesState) as VS
  const initialValues = useRecoilValue(initialValuesState) as VS

  return {
    initialValues,
    values,
    ...useSetValues(),
  }
}
