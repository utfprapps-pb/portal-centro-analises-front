import { ProjectModalFilterProps } from './types'
import { useProjectModalFilter } from './useProjectModalFilter'
import { TextField } from '@/components'
import { ModalFilterContainer } from '@/templates'

export const ProjectModalFilter: React.FC<ProjectModalFilterProps> = ({
  initialData,
  onApply,
  onCancel
}) => {
  const { formData, handleChange, handleOnCancel, handleSubmit } =
    useProjectModalFilter({
      initialData,
      onApply,
      onCancel
    })

  return (
    <ModalFilterContainer apply={handleSubmit} cancel={handleOnCancel}>
      <TextField
        label="Assunto"
        value={formData.subject}
        onChange={handleChange('subject')}
        placeholder="Filtrar por assunto"
      />
    </ModalFilterContainer>
  )
}
