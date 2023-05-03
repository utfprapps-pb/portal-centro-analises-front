import { useCallback } from 'react'

import { useProjectPage } from './useProjectPage'
import { ProjectTableData } from '@/services/api/project'
import { CrudPage } from '@/templates'

export const ProjectPage: React.FC = () => {
  const hookData = useProjectPage()
  const { formData, table } = hookData

  const formRender = useCallback(() => <div>Form</div>, [])

  return (
    <CrudPage
      hookData={hookData}
      texts={{
        delete: (data: ProjectTableData) => ({
          title: `Deseja deletar o projeto ${data.subject}?`,
          description: 'Ao confirmar, o projeto será deletado permanentemente.'
        })
      }}
      table={table}
      form={{
        title: 'Projeto',
        data: formData,
        submitButtonText: 'projeto',
        render: formRender
      }}
      title="Projetos"
    />
  )
}
