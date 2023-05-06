import { ProjectFormData } from './shared.types'

export type UpdateProject = (id: string, data: ProjectFormData) => Promise<void>
