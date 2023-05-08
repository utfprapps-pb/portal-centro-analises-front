import { ProjectFormData } from './shared.types'

export type CreateProject = (data: ProjectFormData) => Promise<void>
