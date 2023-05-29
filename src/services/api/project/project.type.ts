export type ProjectParams = {
  id: number
  description: string
  subject: string
  teacherId: number
  students: StudentsParams[]
}

export type ProjectResponseProps = {
  description: string
  subject: string
  teacherId: number
}

export type StudentsParams = {
  id: number
}
