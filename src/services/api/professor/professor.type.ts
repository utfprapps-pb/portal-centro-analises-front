import { StudentsParams } from "../students/student.type"

export type ProfessorParams = {
  id: number
  name: string
  email: string
  siape: string
}

export type StudentProfessorParams = {
  id?: number
  student: StudentsParams
  teacher: ProfessorParams
  aproved?: boolean
}