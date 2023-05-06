import { useMemo } from 'react'

import { Trash, PencilSimple } from 'phosphor-react'

import { BaseTableProps, ListActions } from '@/components'
import { ListActionsProps } from '@/components/listActions/type'
import {
  ProjectCrudIntegration,
  ProjectFormData,
  ProjectTableData
} from '@/services/api/project'
import { theme } from '@/styles'
import { crudHook } from '@/templates'

export const useProjectPage = () => {
  const projectApi = new ProjectCrudIntegration()

  const useCrudHook = crudHook<ProjectTableData, ProjectFormData>({
    services: {
      list: projectApi.list,
      create: projectApi.create,
      update: projectApi.update,
      delete: projectApi.delete,
      getOne: projectApi.getOne
    },
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
          accessorKey: 'teacher.label'
        },
        {
          header: 'Alunos',
          accessorKey: 'students',
          accessorFn: ({ students }) =>
            students.map(({ label }) => label).join(', ')
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
                icon: <PencilSimple />,
                text: 'Editar',
                onClick: () => hookData.setResourceIdToUpdate(id)
              },
              {
                color: theme.colors.white,
                background: theme.colors.error,
                icon: <Trash />,
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
    table
  }
}
