export type ProjectParams = {
  id?: number
  description: string
  subject: string
  students: StudentsParams[]
  teacher?: any
}

export type ProjectResponseProps = {
  description: string
  subject: string
}

export type StudentsParams = {
  id: number
  name: string
  email: string
  ra: string
}
