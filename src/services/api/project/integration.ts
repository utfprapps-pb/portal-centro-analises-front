import { HttpStatusCode } from 'axios'

import {
  GetProjects,
  ProjectTableData,
  CreateProject,
  UpdateProject,
  DeleteProject
} from './types'
import { ApiHttpClient, CrudIntegration } from '..'
import { UnexpectedError } from '../errors'

export class ProjectCrudIntegration
  implements
    CrudIntegration<CreateProject, DeleteProject, GetProjects, UpdateProject>
{
  create: CreateProject = async (data) => {
    const api = new ApiHttpClient()

    const { statusCode } = await api.request({
      url: '/v1/project',
      method: 'post',
      body: data
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

  list: GetProjects = async ({ filters, pagination }) => {
    const api = new ApiHttpClient<ProjectTableData[]>()

    const {
      statusCode,
      body: projects,
      totalPages
    } = await api.request({
      url: '/v1/project',
      method: 'get',
      filters,
      pagination
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

    const { statusCode } = await api.request({
      url: `/v1/project/${id}`,
      method: 'patch',
      body: data
    })

    if (statusCode === HttpStatusCode.NoContent) return

    throw new UnexpectedError()
  }
}
