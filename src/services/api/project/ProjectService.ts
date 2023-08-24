import { ProjectParams } from './project.type'
import { api } from '@/libs'

const save = (project: ProjectParams) => api.post('/project', project)

const findAll = () => api.get('/project')

const remove = (id: number) => api.delete(`/project/${id}`)

const findById = (id: number) => api.post(`/project/${id}`)

const page = (page: number, size: number, order: string, sort: boolean) => {
  return api.get(`/project/page/?page=${page}&size=${size}&order=${order}&sort=${sort}`)
}

const ProjectService = {
  save,
  findAll,
  remove,
  findById,
  page
}

export default ProjectService
