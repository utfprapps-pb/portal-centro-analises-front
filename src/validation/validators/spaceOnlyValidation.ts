import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class SpaceOnlyValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const [, value] =
      Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
      []
    if (value.trim().length !== 0) return null

    return new InvalidFieldError(
      'O campo não deve ser preenchido só com espaços'
    )
  }
}
