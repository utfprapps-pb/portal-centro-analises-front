import { ListParams } from '@/services/api'

type Teacher = {
  id: string
  name: string
}

type Student = {
  id: string
  name: string
}

export type GetProjects = (params: ListParams) => Promise<GetProjectsResponse>

export type GetProjectsResponse = {
  resources: ProjectTableData[]
  totalPages: number
}

export type ProjectTableData = {
  id: string
  description: string
  subject: string
  teacher: Teacher
  students: Student[]
}
