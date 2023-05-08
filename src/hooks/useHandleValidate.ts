import { useCallback, useMemo } from 'react'

import { ValidationComposite } from '@/validation/validationComposite'

type UseHandleValidateProps<FD extends object> = {
  formData: FD
  validation: ValidationComposite
}

export const useHandleValidate = <K extends string, FD extends object>({
  formData,
  validation
}: UseHandleValidateProps<FD>) => {
  const handleValidate = useCallback(
    (field: K) => (): string => {
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
