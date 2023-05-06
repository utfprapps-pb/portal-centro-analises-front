import { ListParams } from '@/services/api'
import { Option } from '@/types'

export type GetProjects = (params: ListParams) => Promise<GetProjectsResponse>

export type GetProjectsResponse = {
  resources: ProjectTableData[]
  totalPages: number
}

export type ProjectTableData = {
  id: string
  description: string
  subject: string
  teacher: Option
  students: Option[]
}
