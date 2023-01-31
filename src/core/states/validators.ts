import { atom } from 'recoil'
import { FormRules } from '../types'

export const rulesState = atom<FormRules>({
  key: 'rules',
  default: {},
  dangerouslyAllowMutability: true,
})
