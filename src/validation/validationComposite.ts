import { Validation, FieldValidation, Validate } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate: Validate = ({ formData, fieldName }) => {
    const validators = this.validators.filter(
      (validator) => validator.field === fieldName
    )

    // eslint-disable-next-line no-restricted-syntax
    for (const validator of validators) {
      const error = validator.validate(formData)

      if (error) {
        return error.message
      }
    }

    return null
  }
}
