import { formIdState } from '../states'
import { useRecoilValue } from 'recoil'
import { UseFormMeta } from '../types'

/**
 * 提供表单元信息
 * 暂时只提供 formId, 未来有时间再增加其他的
 */
export const useFormMeta = (): UseFormMeta => {
  const formId = useRecoilValue(formIdState)
  return {
    formId,
  }
}
