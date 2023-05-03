export type Validate = (params: {
  formData: object
  fieldName: string
}) => string | null

export interface Validation {
  validate: Validate
}
