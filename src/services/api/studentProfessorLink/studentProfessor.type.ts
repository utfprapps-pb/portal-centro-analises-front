import { ProfessorParams } from "../professor/professor.type"
import { StudentsParams } from "../students/student.type"


export type StudentProfessorParams = {
  id?: number
  student: StudentsParams
  teacher: ProfessorParams
  aproved?: boolean
}