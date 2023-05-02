import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const [, value] =
      Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
      []

    if (value && !!value.trim()) return null

    return new RequiredFieldError()
  }
}
