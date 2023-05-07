import { ProjectForm } from './form'
import { ProjectModalFilter } from './modalFilter'
import { useProjectPage } from './useProjectPage'
import { ProjectFormData, ProjectTableData } from '@/services/api/project'
import { CrudPage } from '@/templates'

export const ProjectPage: React.FC = () => {
  const projectData = useProjectPage()
  const {
    createLoading,
    dependences,
    dependencesLoading,
    modalFilter,
    table,
    touched,
    updateLoading,
    handleCreateResource,
    handleUpdateResource,
    setFilters
  } = projectData

  return (
    <CrudPage<ProjectTableData, ProjectFormData>
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
            dependences={dependences}
            dependencesLoading={dependencesLoading}
            onSubmit={handleCreateResource}
          />
        ),
        renderUpdateContainer: (data) => (
          <ProjectForm
            title={`Atualizar Projeto ${data.subject}`}
            submitButtonText="Atualizar projeto"
            initialData={data}
            touched={touched}
            loading={updateLoading}
            dependences={dependences}
            dependencesLoading={dependencesLoading}
            onSubmit={handleUpdateResource}
          />
        ),
        renderFilterContainer: () => (
          <ProjectModalFilter
            onCancel={modalFilter.close}
            onApply={({ formData }) => {
              setFilters({
                ...formData
              })
              modalFilter.close()
            }}
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
