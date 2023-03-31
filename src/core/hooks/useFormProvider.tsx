import React from 'react'
import { RecoilRoot } from 'recoil'
import { nanoid } from 'nanoid'
import { formIdState, valuesState, initialValuesState } from '../states'
import { FormValues } from '../types'

export const useFormProvider = <VS extends FormValues>(defaultValues?: VS) => {
  const FormProvider = (props: { children: React.ReactNode }) => {
    const initializeState = ({ set }) => {
      set(formIdState, nanoid())
      if (defaultValues) {
        set(initialValuesState, defaultValues)
        set(valuesState, defaultValues)
      }
    }
    return <RecoilRoot initializeState={initializeState}>{props.children}</RecoilRoot>
  }

  return FormProvider
}
