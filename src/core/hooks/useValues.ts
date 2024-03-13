import { useCallback } from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'
import { UseValues, FormValues } from '../types'
import { valuesState, initialValuesState } from '../states'
import { useFromState, useSetFromStatePath } from './useImmerRecoilState'
import { set } from 'lodash-es'

export const useSetValues = <VS extends FormValues>(): Omit<UseValues<VS>, 'values' | 'initialValues'> => {
  const setOriginValues = useSetFromStatePath(valuesState)
  const [originInitialValues, , setOriginInitialValues] = useFromState(initialValuesState)

  const setValues: UseValues<VS>['setValues'] = setOriginValues

  const resetValues: UseValues<VS>['resetValues'] = useRecoilCallback(({ set }) => () => {
    set(valuesState, originInitialValues)
  }, [originInitialValues])

  const removeValues: UseValues<VS>['removeValues'] = useCallback((fields) => {
    setOriginValues(draft => {
      if (Array.isArray(fields)) {
        fields.forEach(item => {
          set(draft, item, undefined)
        })
      } else {
        set(draft, fields, undefined)
      }
    })
  }, [])

  const setInitialValues: UseValues<VS>['setInitialValues'] = setOriginInitialValues

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
