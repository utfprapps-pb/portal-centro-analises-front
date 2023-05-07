import { ProjectDependences, ProjectFormData } from '@/services/api/project'
import { FormContainerProps } from '@/templates'

type Props = {
  touched: boolean
  initialData?: ProjectFormData
  dependences?: ProjectDependences
  dependencesLoading?: boolean
  onSubmit: (props: {
    formData: ProjectFormData
    formIsValid: boolean
  }) => Promise<void>
}

export type ProjectFormProps = Props &
  Omit<FormContainerProps, 'children' | 'onSubmit'>
