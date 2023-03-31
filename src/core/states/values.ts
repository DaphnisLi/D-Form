import { atom } from 'recoil'
import { FormValues } from '../types'

export const valuesState = atom<FormValues>({
  key: 'values',
  default: {},
})

export const initialValuesState = atom<FormValues>({
  key: 'initialValues',
  default: {},
})
