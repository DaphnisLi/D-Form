import { useRecoilValue, useSetRecoilState, RecoilState } from 'recoil'
import { SetData } from '../types'
import { set } from 'lodash-es'
import produce, { Draft } from 'immer'
import { useCallback } from 'react'

/**
 * @param state recoil 状态
 * @param isSubscribeUpdate 是否订阅更新
 *
 * https://recoiljs.org/zh-hans/docs/api-reference/core/useSetRecoilState#:~:text=%E5%BD%93%E4%B8%80%E4%B8%AA%E7%BB%84%E4%BB%B6%E9%9C%80%E8%A6%81%E5%86%99%E5%85%A5%E8%80%8C%E4%B8%8D%E9%9C%80%E8%A6%81%E8%AF%BB%E5%8F%96%20state%20%E6%97%B6%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E6%AD%A4%20hook%E3%80%82%E5%A6%82%E6%9E%9C%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E4%BA%86%20useRecoilState()%20%E6%9D%A5%E8%8E%B7%E5%8F%96%20setter%20%E5%87%BD%E6%95%B0%EF%BC%8C%E9%82%A3%E4%B9%88%E5%90%8C%E6%97%B6%E5%AE%83%E4%B9%9F%E4%BC%9A%E8%AE%A2%E9%98%85%E6%9B%B4%E6%96%B0%EF%BC%8C%E5%B9%B6%E5%9C%A8%20atom%20%E6%88%96%20selector%20%E6%9B%B4%E6%96%B0%E6%97%B6%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E3%80%82%E4%BD%BF%E7%94%A8%20useSetRecoilState()%20%E5%85%81%E8%AE%B8%E7%BB%84%E4%BB%B6%E5%9C%A8%E5%80%BC%E5%8F%91%E7%94%9F%E6%94%B9%E5%8F%98%E6%97%B6%E8%80%8C%E4%B8%8D%E7%94%A8%E7%BB%99%E7%BB%84%E4%BB%B6%E8%AE%A2%E9%98%85%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E8%AE%BE%E7%BD%AE%E5%80%BC%E3%80%82
*/
export const useSetFromState = <D extends object>(state: RecoilState<D>) => {
  const setValue = useSetRecoilState(state)

  const set: SetData<D> = useCallback(<K extends keyof Draft<D>>(data: any, value?: Draft<D>[K]) => {
    if (typeof data === 'string') {
      setValue(produce((draft: Draft<D>) => {
        draft[data] = value
      }))
    } else if (typeof data === 'object') {
      setValue(produce((draft: Draft<D>) => {
        for (const key of Object.keys(data)) {
          draft[key] = data[key]
        }
      }))
    } else if (typeof data === 'function') {
      setValue(produce(data as (draft: Draft<D>) => void))
    }
  }, [])
  return set
}

/**
 * 以 path 的方式设置 value
 */
export const useSetFromStatePath = <D extends object>(state: RecoilState<D>) => {
  const setValue = useSetRecoilState(state)

  const handleSet: SetData<D> = useCallback(<K extends keyof Draft<D>>(data: any, value?: Draft<D>[K]) => {
    if (typeof data === 'string') {
      setValue(produce((draft: Draft<D>) => {
        set(draft, data, value)
      }))
    } else if (typeof data === 'object') {
      setValue(produce((draft: Draft<D>) => {
        for (const key of Object.keys(data)) {
          set(draft, key, data[key])
        }
      }))
    } else if (typeof data === 'function') {
      setValue(produce(data as (draft: Draft<D>) => void))
    }
  }, [])
  return handleSet
}

/**
 * @param state recoil 状态
 * @param isSubscribeUpdate 是否订阅更新
 */
export const useFromState = <D extends object>(state: RecoilState<D>) => {
  const value = useRecoilValue(state)
  const setValue = useSetFromState(state)
  const setValuePath = useSetFromStatePath(state)
  return [value, setValue, setValuePath] as [D, SetData<D>, SetData<D>]
}
