import React from 'react'

import { ProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'
import { Autocomplete, MultSelect, TextField } from '@/components'
import { FormContainer } from '@/templates'

export const ProjectForm: React.FC<ProjectFormProps> = ({
  title,
  submitButtonText,
  initialData,
  loading,
  touched,
  onSubmit
}) => {
  const { formData, handleChange, handleSubmit, handleValidate } =
    useProjectForm({
      initialData,
      onSubmit
    })

  return (
    <FormContainer
      title={title}
      submitButtonText={submitButtonText}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <TextField
        label="Assunto"
        placeholder="Digite o assunto"
        value={formData.subject}
        onChange={handleChange('subject')}
        disabled={loading}
        loading={loading}
        touched={touched}
        validator={handleValidate('subject')}
      />

      <TextField
        label="Descrição"
        placeholder="Digite a descrição"
        value={formData.description}
        onChange={handleChange('description')}
        disabled={loading}
        loading={loading}
        touched={touched}
        validator={handleValidate('description')}
      />

      <Autocomplete
        label="Professor"
        value={formData.teacher}
        options={[
          {
            id: '1',
            label: 'Professor 1'
          },
          {
            id: '2',
            label: 'Professor 2'
          },
          {
            id: '3',
            label: 'Professor 3'
          }
        ]}
        onSelectOption={handleChange('teacher')}
        onChange={() => null}
        disabled={loading}
        loading={loading}
        touched={touched}
        noOptionsText="Nenhum professor encontrado"
        validator={handleValidate('teacher')}
      />

      <MultSelect
        label="Estudantes"
        value={formData.students}
        options={[
          {
            id: '1',
            label: 'Estudante 1'
          },
          {
            id: '2',
            label: 'Estudante 2'
          },
          {
            id: '3',
            label: 'Estudante 3'
          }
        ]}
        onSelectOption={handleChange('students')}
        disabled={loading}
        loading={loading}
        touched={touched}
        noOptionsText="Nenhum estudante encontrado"
        validator={handleValidate('students')}
      />
    </FormContainer>
  )
}
