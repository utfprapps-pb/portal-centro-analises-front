import { Option } from '@/types'

export type DependencesResult = {
  id: number
  role: 'professor' | 'student'
  name: string
}

export type GetProjectDependences = () => Promise<ProjectDependences>

export type ProjectDependences = {
  teachers: Option[]
  students: Option[]
}
