import { LoginParams } from '@/services/api/auth'
import { ValidationBuilder } from '@/validation/validationBuilder'
import { ValidationComposite } from '@/validation/validationComposite'

type ModelKeys = keyof LoginParams

export const loginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field<ModelKeys>('email').required().build(),
    ...ValidationBuilder.field<ModelKeys>('password').required().build()
  ])
