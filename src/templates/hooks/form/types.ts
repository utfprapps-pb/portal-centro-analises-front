import { ValidationComposite } from '@/validation/validationComposite'

export type HookProps<T extends object> = {
  initialData?: T
  onSubmit: (props: { formData: T; formIsValid: boolean }) => Promise<void>
}

export type Props<T extends object> = {
  defaultFormData: T
  validation: ValidationComposite
}
