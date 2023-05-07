export type HookProps<T extends object> = {
  initialData?: T
  onApply: (props: { formData: T }) => void
  onCancel: () => void
}

export type Props<T extends object> = {
  defaultFormData: T
}
