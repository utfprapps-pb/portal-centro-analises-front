export interface FieldValidation {
  field: string
  validate: (formData: object) => Error | null
}
