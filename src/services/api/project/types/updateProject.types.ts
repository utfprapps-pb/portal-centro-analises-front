import { ProjectFormData } from './createProject.types'

export type UpdateProject = (id: string, data: ProjectFormData) => Promise<void>
