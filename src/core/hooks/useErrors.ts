import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { UseErrors } from '../types'
import { errorsState } from '../states'
import { useSetFromState } from './useRecoilState'

export const useSetErrors = (): Omit<UseErrors, 'errors'> => {
  const set = useSetFromState(errorsState)

  const setErrors = useCallback((data, value) => {
    set(data, value)
  }, [])

  const resetErrors = useCallback(() => {
    set({})
  }, [])

  const removeErrors = useCallback((fields) => {
    set(draft => {
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
