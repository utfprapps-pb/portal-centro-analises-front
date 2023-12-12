export interface UserLogin {
  email: string
  password: string
}

export interface User {
  id: number
  displayName: string
  email: string
  password: string
  role: string
}

export interface EditUser {
  id?: number | undefined
  name?: string | undefined
  orientador?: number | undefined
  email?: string | undefined
  role?: string | undefined
}

export interface EditFinance {
  value: string
  type: number
  description: string
  user: User
}

export interface AuthenticationResponse {
  token: string
  user: AuthenticatedUser
}

export interface AuthenticatedUser {
  id: number
  displayName: string
  email: string
  role: string
}

export interface Authorities {
  authority: string
}

export interface Project {
  id: number
  description: string
  subject: string
}

export interface Teacher {
  id: number
  name: string
  email: string
}

export type SignUpParams = {
  name: string
  username: string
  password: string
  email: string
}

export interface SolicitationAudit {
  id?: number
  changeDate: string
  newStatus?: string
  dropdown?: boolean
  solicitation?: {
    changeDate: string
    solicitation: any
    id: number
    newStatus: string
    createdBy: {
      id: number
      name: string
    }
    equipment: {
      form: string
      name: string
    }
    project: {
      description: string
      subject: string
      teacher: {
        name: string
      }
    }
    value: number
    fileUrl: string
    projectNature: {
      content: string
    }
    otherProjectNature?: string;
    rejectionReason?: string;
  }
}

export type LabelValue = {
  label: string
  value: string
}

export type GraficoDadoDTO = {
  backgroundColor: string[];
  data: number[];
}

export type GraficoDTO = {
  titulo: string;
  labels: string[];
  datasets: GraficoDadoDTO[];
}
