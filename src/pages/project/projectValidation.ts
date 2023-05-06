import { ProjectFormData } from '@/services/api/project'
import { ValidationBuilder } from '@/validation/validationBuilder'
import { ValidationComposite } from '@/validation/validationComposite'

type ModelKeys = keyof ProjectFormData

export const projectValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field<ModelKeys>('description').required().build(),
    ...ValidationBuilder.field<ModelKeys>('subject').required().build(),
    ...ValidationBuilder.field<ModelKeys>('teacher').required().build(),
    ...ValidationBuilder.field<ModelKeys>('students').required().build()
  ])
