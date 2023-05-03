export type CreateProject = (data: ProjectFormData) => Promise<void>

export type ProjectFormData = {
  description: string
  subject: string
  teacherId: string
  studentsIds: string[]
}
