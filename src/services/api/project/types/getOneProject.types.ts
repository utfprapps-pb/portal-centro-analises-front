import { ProjectFormData } from './shared.types'

export type GetOneProject = (id: string) => Promise<ProjectFormData>
