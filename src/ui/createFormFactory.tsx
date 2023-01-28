import React, { forwardRef } from 'react'
import {
  FormValues,
  useFormProvider,
  useValues,
  useSetValues,
  useErrors,
  useSetErrors,
  useValidate,
  useFormMeta,
  useNoSubscribeUpdate,
} from '../core'
import { BaseStore, FieldProps } from './types'
import { Field as FieldElement } from './Field'

export const createFormFactory = <FI, >(FieldWrapperComponent: React.ComponentType<FI>) => {
  return <VS extends FormValues>(defaultValues?: VS) => {
    const FormProvider = useFormProvider(defaultValues)

    const Field = <F extends keyof VS>(props: FieldProps<F, FI>) => <FieldElement {...props} wrapper={FieldWrapperComponent} />


    const withForm = (Components) => {
      return forwardRef((props, ref) => {
        return <FormProvider><Components {...props} ref={ref} /></FormProvider>
      })
    }

    return {
      withForm,
      Field,
      useValues,
      useSetValues,
      useErrors,
      useSetErrors,
      useValidate,
      useFormMeta,
      useNoSubscribeUpdate,
    } as BaseStore<VS, FI>
  }
}
