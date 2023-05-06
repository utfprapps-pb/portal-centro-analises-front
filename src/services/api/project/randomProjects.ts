import { faker } from '@faker-js/faker/locale/en'

import { GetProjectsResponse, ProjectFormData, ProjectTableData } from './types'

export class RandomProjects {
  static getProjects(): GetProjectsResponse {
    const totalOfProjects = 10
    const totalOfStudents = Number(faker.random.numeric(1))

    const students: ProjectTableData['students'] = Array.from(
      { length: totalOfStudents },
      () => ({
        id: faker.datatype.uuid(),
        label: faker.name.fullName()
      })
    )

    const projects: ProjectTableData[] = Array.from(
      { length: totalOfProjects },
      () => ({
        id: faker.datatype.uuid(),
        description: faker.lorem.paragraph(),
        subject: faker.lorem.word(),
        students,
        teacher: {
          id: faker.datatype.uuid(),
          label: faker.name.fullName()
        }
      })
    )

    const totalPages = Math.ceil(totalOfProjects / 10)

    return {
      resources: projects,
      totalPages
    }
  }

  static getProject(): ProjectFormData {
    return {
      subject: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      teacher: {
        id: faker.datatype.uuid(),
        label: faker.name.fullName()
      },
      students: Array.from({ length: 3 }, () => ({
        id: faker.datatype.uuid(),
        label: faker.name.fullName()
      }))
    }
  }
}
