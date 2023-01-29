import { useCallback } from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState, useSetFromStatePath } from './useRecoilState'

export const useSetValues = <VS extends FormValues>(): Omit<UseValues<VS>, 'values' | 'initialValues'> => {
  const setOriginValues = useSetFromStatePath(valuesState)
  const [originInitialValues, , setOriginInitialValues] = useFromState(initialValuesState)

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
