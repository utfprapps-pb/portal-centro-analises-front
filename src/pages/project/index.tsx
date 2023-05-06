import { ProjectForm } from './form'
import { useProjectPage } from './useProjectPage'
import { ProjectTableData } from '@/services/api/project'
import { CrudPage } from '@/templates'

export const ProjectPage: React.FC = () => {
  const projectData = useProjectPage()
  const { createLoading, table, touched, updateLoading } = projectData

  return (
    <CrudPage
      title="Projetos"
      notFoundResourceName="projetos"
      table={table}
      hookData={projectData}
      form={{
        renderCreateContainer: () => (
          <ProjectForm
            title="Novo Projeto"
            submitButtonText="Criar projeto"
            touched={touched}
            loading={createLoading}
            onSubmit={projectData.handleCreateResource}
          />
        ),
        renderUpdateContainer: (data) => (
          <ProjectForm
            title={`Atualizar Projeto ${data.subject}`}
            submitButtonText="Atualizar projeto"
            initialData={data}
            touched={touched}
            loading={updateLoading}
            onSubmit={projectData.handleUpdateResource}
          />
        )
      }}
      texts={{
        delete: (data: ProjectTableData) => ({
          title: `Deseja deletar o projeto ${data.subject}?`,
          description: 'Ao confirmar, o projeto será deletado permanentemente.'
        })
      }}
    />
  )
}
