import { atom } from 'recoil'

export const formIdState = atom<string>({
  key: 'formId',
  default: '',
})
