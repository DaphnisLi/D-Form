import React from 'react'
import { RecoilRoot } from 'recoil'
import { nanoid } from 'nanoid'
import { formIdState, valuesState, initialValuesState } from '../states'
import { FormValues } from '../types'

export const useFormProvider = <VS extends FormValues>(defaultValues?: VS) => {
  const initializeState = ({ set }) => {
    set(formIdState, nanoid())
    if (defaultValues) {
      set(initialValuesState, defaultValues)
      set(valuesState, defaultValues)
    }
  }

  return (props: { children: React.ReactNode }) => {
    return <RecoilRoot initializeState={initializeState}>{props.children}</RecoilRoot>
  }
}
