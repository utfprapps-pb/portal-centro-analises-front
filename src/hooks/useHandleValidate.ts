import { useCallback, useMemo } from 'react'

import { ValidationComposite } from '@/validation/validationComposite'

type UseHandleValidateProps<TFormData extends object> = {
  formData: TFormData
  validation: ValidationComposite
}

export const useHandleValidate = <
  TKey extends string,
  TFormData extends object
>({
  formData,
  validation
}: UseHandleValidateProps<TFormData>) => {
  const handleValidate = useCallback(
    (field: TKey) => (): string => {
      const valid =
        validation.validate({
          fieldName: field,
          formData
        }) || ''

      return valid
    },
    [formData, validation]
  )

  const formIsValid = useMemo(
    () =>
      Object.keys(formData).every(
        (key) =>
          !validation.validate({
            formData,
            fieldName: key
          })
      ),
    [formData, validation]
  )

  return {
    formIsValid,
    handleValidate
  }
}
