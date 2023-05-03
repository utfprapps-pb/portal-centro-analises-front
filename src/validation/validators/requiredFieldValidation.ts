import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const [, value] =
      Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
      []

    if (value) return null

    if (Array.isArray(value) && value.length) return null

    return new RequiredFieldError()
  }
}
