import { useCallback, useState } from 'react'

import { HookProps, Props } from './types'
import { useHandleChangeFormData, useHandleValidate } from '@/hooks'

export const formContainerHook =
  <T extends object>(props: Props<T>) =>
  (hookProps: HookProps<T>) => {
    const { defaultFormData, validation } = props
    const { initialData, onSubmit } = hookProps

    const [formData, setFormData] = useState<T>(initialData || defaultFormData)

    const { formIsValid, handleValidate } = useHandleValidate({
      formData,
      validation
    })

    const handleSubmit = useCallback(async () => {
      onSubmit({
        formData,
        formIsValid
      })
    }, [formData, formIsValid, onSubmit])

    const { handleChange } = useHandleChangeFormData({
      formData,
      setFormData
    })

    return {
      formData,
      handleChange,
      handleSubmit,
      handleValidate,
      setFormData
    }
  }
