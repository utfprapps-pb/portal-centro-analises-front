import { Option } from '@/types'

export type ProjectFormData = {
  description: string
  subject: string
  teacher: Option
  students: Option[]
}
