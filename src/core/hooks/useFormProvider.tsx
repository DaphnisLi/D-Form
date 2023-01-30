import React from 'react'
import { RecoilRoot } from 'recoil'
import { nanoid } from 'nanoid'
import { formIdState, valuesState, initialValuesState, errorsState, rulesState, validateValuesState } from '../states'
import { FormValues } from '../types'

export const useFormProvider = <VS extends FormValues>(defaultValues?: VS) => {
  const FormProvider = (props: { children: React.ReactNode }) => {
    const initializeState = ({ set }) => {
      set(formIdState, nanoid())
      // ? 为什么要在这里给下面三个 state 初始化 ?
      // 我似乎发现了一个 recoil 的 bug, 当 dangerouslyAllowMutability 为 true, set 时直接修改原对象属性值, 不同 RecoilRoot 的 state 会共享值, 所以就不得不在这里再初始化一次
      // 主要是我不想放弃 useRecoilState 里的写法
      set(errorsState, {})
      set(rulesState, {})
      set(validateValuesState, {})
      set(initialValuesState, defaultValues || {})
      set(valuesState, defaultValues || {})
    }
    return <RecoilRoot initializeState={initializeState}>{props.children}</RecoilRoot>
  }

  return FormProvider
}
