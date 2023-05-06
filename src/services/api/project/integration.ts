import { HttpStatusCode } from 'axios'

import {
  GetProjects,
  ProjectTableData,
  CreateProject,
  UpdateProject,
  DeleteProject,
  GetOneProject,
  ProjectFormData
} from './types'
import { ApiHttpClient, CrudIntegration } from '..'
import { UnexpectedError } from '../errors'

export class ProjectCrudIntegration
  implements
    CrudIntegration<
      CreateProject,
      DeleteProject,
      GetProjects,
      UpdateProject,
      GetOneProject
    >
{
  getOne: GetOneProject = async (id) => {
    const api = new ApiHttpClient<ProjectFormData>()

    const { statusCode, body } = await api.request({
      url: `/v1/project/${id}`,
      method: 'get'
    })

    if (statusCode === HttpStatusCode.Ok && !!body) {
      return body
    }

    throw new UnexpectedError()
  }

  create: CreateProject = async (data) => {
    const api = new ApiHttpClient()

    const payload = {
      ...data,
      students: data.students.map((student) => student.id),
      teacher: data.teacher.id
    }

    const { statusCode } = await api.request({
      url: '/v1/project',
      method: 'post',
      body: payload
    })

    if (statusCode === HttpStatusCode.Created) return

    throw new UnexpectedError()
  }

  delete: DeleteProject = async (id) => {
    const api = new ApiHttpClient()

    const { statusCode } = await api.request({
      url: `/v1/project/${id}`,
      method: 'delete'
    })

    if (statusCode === HttpStatusCode.NoContent) return

    throw new UnexpectedError()
  }

  list: GetProjects = async ({ filters, pagination, sort }) => {
    const api = new ApiHttpClient<ProjectTableData[]>()

    const {
      statusCode,
      body: projects,
      totalPages
    } = await api.request({
      url: '/v1/project',
      method: 'get',
      filters,
      pagination,
      sort
    })

    if (statusCode === HttpStatusCode.Ok && !!projects) {
      return {
        resources: projects,
        totalPages: totalPages ?? 1
      }
    }

    throw new UnexpectedError()
  }

  update: UpdateProject = async (id, data) => {
    const api = new ApiHttpClient()

    const payload = {
      ...data,
      students: data.students.map((student) => student.id),
      teacher: data.teacher.id
    }

    const { statusCode } = await api.request({
      url: `/v1/project/${id}`,
      method: 'patch',
      body: payload
    })

    if (statusCode === HttpStatusCode.NoContent) return

    throw new UnexpectedError()
  }
}
