import React, { forwardRef } from 'react'
import {
  FormValues,
  useFormProvider,
  useValues,
  useSetValues,
  useErrors,
  useSetErrors,
  useValidate,
  useNoSubscribeUpdate,
} from '../core'
import { BaseStore, FieldProps } from './types'
import { Field as FieldElement } from './Field'
import { AntdFieldProps } from '../antd-form'

export const createFormFactory = <FI extends AntdFieldProps>(FieldWrapperComponent: React.ComponentType<FI>) => {
  return <VS extends FormValues>(defaultValues?: VS) => {
    const FormProvider = useFormProvider(defaultValues)

    const Field = <K extends keyof VS, F>(props: FieldProps<VS[K], FI, F>) => <FieldElement {...props} wrapper={FieldWrapperComponent} />


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
      useNoSubscribeUpdate,
    } as BaseStore<VS, FI>
  }
}
