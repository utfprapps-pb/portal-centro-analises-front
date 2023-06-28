export type ArovacoesParams = {
  id?: number
  createdBy: Object
  description: string
  fields: Object
  project?: Object
  status: string
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
