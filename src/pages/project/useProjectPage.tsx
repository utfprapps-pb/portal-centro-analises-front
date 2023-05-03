import { useMemo, useState } from 'react'

import { Delete, Edit } from '@material-ui/icons'

import { projectValidation } from './projectValidation'
import { BaseTableProps, ListActions } from '@/components'
import { ListActionsProps } from '@/components/listActions/type'
import { useHandleChangeFormData } from '@/hooks'
import {
  ProjectCrudIntegration,
  ProjectFormData,
  ProjectTableData
} from '@/services/api/project'
import { theme } from '@/styles'
import { crudHook } from '@/templates'

export const useProjectPage = () => {
  const projectApi = new ProjectCrudIntegration()
  const validation = projectValidation()

  const useCrudHook = crudHook<ProjectTableData, ProjectFormData>({
    services: {
      list: projectApi.list,
      create: projectApi.create,
      update: projectApi.update,
      delete: projectApi.delete
    },
    validation,
    texts: {
      delete: {
        success: 'Projeto deletado com sucesso!'
      },
      create: {
        success: 'Projeto criado com sucesso!'
      },
      update: {
        success: 'Projeto atualizado com sucesso!'
      }
    }
  })

  const hookData = useCrudHook()

  const [formData, setFormData] = useState<ProjectFormData>({
    description: '',
    subject: '',
    teacherId: '',
    studentsIds: []
  })

  const { handleChange } = useHandleChangeFormData({
    formData,
    setFormData
  })

  const table = useMemo<BaseTableProps<ProjectTableData>>(
    () => ({
      columns: [
        {
          header: 'Assunto',
          accessorKey: 'subject'
        },
        {
          header: 'Descrição',
          accessorKey: 'description'
        },
        {
          header: 'Professor',
          accessorKey: 'teacher.name'
        },
        {
          header: 'Alunos',
          accessorKey: 'students',
          accessorFn: ({ students }) =>
            students.map(({ name }) => name).join(', ')
        },
        {
          id: 'actions',
          header: 'Ações',
          cell: ({ row }) => {
            const { id } = row.original

            const actions: ListActionsProps['actions'] = [
              {
                color: theme.colors.white,
                background: theme.colors.blue,
                icon: <Edit />,
                text: 'Editar',
                onClick: () => hookData.setResourceIdToUpdate(id)
              },
              {
                color: theme.colors.white,
                background: theme.colors.error,
                icon: <Delete />,
                text: 'Excluir',
                onClick: () => hookData.setResourceIdToExclude(id)
              }
            ]

            return <ListActions actions={actions} />
          }
        }
      ],
      sorting: hookData.sorting,
      setSorting: hookData.setSorting
    }),
    [hookData]
  )

  return {
    ...hookData,
    formData,
    table,
    handleChange
  }
}
