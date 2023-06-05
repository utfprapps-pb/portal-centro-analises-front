export type ProjectParams = {
  id?: number
  description: string
  subject: string
  students: StudentsParams[]
}

export type ProjectResponseProps = {
  description: string
  subject: string
}

export type StudentsParams = {
  id: number
}
