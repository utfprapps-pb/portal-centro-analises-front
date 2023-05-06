import { projectValidation } from '@/pages/project/projectValidation'
import { ProjectFormData } from '@/services/api/project'
import { formContainerHook } from '@/templates'

export const useProjectForm = formContainerHook<ProjectFormData>({
  defaultFormData: {
    subject: '',
    description: '',
    teacher: {
      id: '',
      label: ''
    },
    students: []
  },
  validation: projectValidation()
})
