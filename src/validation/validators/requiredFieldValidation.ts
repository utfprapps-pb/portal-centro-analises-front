import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const [, value] =
      Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
      []

    const valueHasProps =
      typeof value === 'object' &&
      !!value &&
      !!Object.values(value).some(Boolean)

    if (valueHasProps) return null
    if (Array.isArray(value) && !!value.length) return null
    if (typeof value === 'string' && !!value) return null

    return new RequiredFieldError()
  }
}
