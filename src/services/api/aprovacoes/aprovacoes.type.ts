import { type } from 'os'

export type AprovacoesParams = {
  id?: number
  createdBy: CreatedBy
  description: string
  equipment: Equipment
  fields: Object
  project?: Object
  status: string
}

export type VinculoParams = {
  id?: number
  createdBy: string
  aproved: boolean
  student: StudentsParams
  teacher: StudentsParams
}

export type Equipment = {
  id?: number
  form: string
  name: string
  valueHourPartner: number
}

export type CreatedBy = {
  id?: number
  email: string
  name: string
  role: string
}

export type FormParams = {
  id?: number
  description: string
  status: string
  fields: object
  project: object
  equipment: object
  projectNature: string
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

export type SolicitationResponse = {
  id: number
  status: string
  reason?: string
}
