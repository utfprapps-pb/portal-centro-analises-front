import { RandomProjects } from './randomProjects'
import {
  CreateProject,
  DeleteProject,
  GetOneProject,
  GetProjectDependences,
  GetProjects,
  UpdateProject
} from './types'
import { CrudIntegration, DependencesIntegration } from '../types'
import { freeze } from '@/utils'

export class ProjectCrudIntegration
  implements
    CrudIntegration<
      CreateProject,
      DeleteProject,
      GetProjects,
      UpdateProject,
      GetOneProject
    >,
    DependencesIntegration<GetProjectDependences>
{
  getDependences: GetProjectDependences = async () => {
    await freeze()

    return RandomProjects.getDependences()
  }

  getOne: GetOneProject = async () => {
    await freeze()

    return RandomProjects.getProject()
  }

  create: CreateProject = async () => {
    await freeze()
  }

  delete: DeleteProject = async () => {
    await freeze()
  }

  list: GetProjects = async () => {
    await freeze()

    return RandomProjects.getProjects()
  }

  update: UpdateProject = async () => {
    await freeze()
  }
}
