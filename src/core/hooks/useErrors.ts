import { useCallback } from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'
import { UseErrors } from '../types'
import { errorsState } from '../states'
import { useSetFromState } from './useImmerRecoilState'

export const useSetErrors = (): Omit<UseErrors, 'errors'> => {
  const setOriginErrors = useSetFromState(errorsState)

  const setErrors: UseErrors['setErrors'] = setOriginErrors


  const resetErrors: UseErrors['resetErrors'] = useRecoilCallback(({ set }) => async () => {
    set(errorsState, {})
  }, [])

  const removeErrors: UseErrors['removeErrors'] = useCallback((fields) => {
    setOriginErrors(draft => {
      if (Array.isArray(fields)) {
        fields.forEach(item => {
          delete draft[item]
        })
      } else {
        delete draft[fields]
      }
    })
  }, [])

  return {
    setErrors,
    resetErrors,
    removeErrors,
  }
}

export const useErrors = (): UseErrors => {
  const errors = useRecoilValue(errorsState)
  return {
    errors,
    ...useSetErrors(),
  }
}
