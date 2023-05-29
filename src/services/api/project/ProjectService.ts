import { ProjectParams } from './project.type'
import { api } from '@/libs'

const save = (project: ProjectParams) => api.post('/project', project)

const findAll = () => api.get('/project')

const remove = (id: number) => api.delete(`/project/${id}`)

const findById = (id: number) => api.get(`/project/${id}`)

const ProjectService = {
  save,
  findAll,
  remove,
  findById
}

export default ProjectService
