import { faker } from '@faker-js/faker/locale/en'

import { GetProjectsResponse, ProjectTableData } from './types'

export class RandomProjects {
  static getProjects(): GetProjectsResponse {
    const totalOfProjects = Number(faker.random.numeric(2))
    const totalOfStudents = Number(faker.random.numeric(1))

    const students: ProjectTableData['students'] = Array.from(
      { length: totalOfStudents },
      () => ({
        id: faker.datatype.uuid(),
        name: faker.name.fullName()
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
          name: faker.name.fullName()
        }
      })
    )

    const totalPages = Math.ceil(totalOfProjects / 10)

    return {
      resources: projects,
      totalPages
    }
  }
}
