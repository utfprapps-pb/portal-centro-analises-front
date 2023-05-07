import { ModalFilterData } from './types'
import { modalFilterHook } from '@/templates'

export const useProjectModalFilter = modalFilterHook<ModalFilterData>({
  defaultFormData: {
    subject: ''
  }
})
