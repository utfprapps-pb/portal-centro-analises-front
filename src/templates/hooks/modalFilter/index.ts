import { useCallback, useState } from 'react'

import { HookProps, Props } from './types'
import { useHandleChangeFormData } from '@/hooks'

export const modalFilterHook =
  <T extends object>(props: Props<T>) =>
  (hookProps: HookProps<T>) => {
    const { defaultFormData } = props
    const { initialData, onApply, onCancel } = hookProps

    const [formData, setFormData] = useState<T>(initialData || defaultFormData)

    const handleOnCancel = useCallback(() => {
      onCancel()
    }, [onCancel])

    const handleSubmit = useCallback(() => {
      onApply({ formData })
    }, [formData, onApply])

    const { handleChange } = useHandleChangeFormData({
      formData,
      setFormData
    })

    return {
      formData,
      handleChange,
      handleOnCancel,
      handleSubmit,
      setFormData
    }
  }
