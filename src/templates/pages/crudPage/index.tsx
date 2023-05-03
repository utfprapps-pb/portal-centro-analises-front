import React from 'react'

import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Delete, FilterList } from '@material-ui/icons'

import * as S from './styles'
import { CrudPageProps } from './types'
import { Button, Modal, Table } from '@/components'
import { Drawer } from '@/components/drawer'
import { Id } from '@/templates/hooks'

export const CrudPage = <
  TTableData extends Id,
  TFormData extends Record<string, unknown>
>(
  props: CrudPageProps<TTableData, TFormData>
) => {
  const { texts, hookData, table, form, title } = props

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title size="h6">{title}</S.Title>
        </S.HeaderLeft>

        <S.HeaderRight>
          <Tooltip title="Filtros">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Button onClick={hookData.createDrawer.open}>
            <Add /> Adicionar
          </Button>
        </S.HeaderRight>
      </S.Header>

      <Table<TTableData>
        {...table}
        data={hookData.resources}
        pagination={{
          totalPages: hookData.totalPages,
          paginationTable: hookData.pagination,
          setPaginationTable: hookData.setPagination
        }}
      />

      <Drawer
        title={
          hookData.isUpdating ? `Editar ${form.title}` : `Criar ${form.title}`
        }
        open={hookData.createDrawer.isOpen}
        onClose={hookData.createDrawer.close}
      >
        <S.Form
          onSubmit={(event) => {
            event.preventDefault()
            hookData.handleCreateResource(form.data)
          }}
        >
          <S.FormBody>{form.render()}</S.FormBody>

          <Button type="submit">
            {hookData.isUpdating
              ? `Editar ${form.title}`
              : `Criar ${form.title}`}
          </Button>
        </S.Form>
      </Drawer>

      {hookData.resourceToExclude && (
        <Modal
          isOpen={!!hookData.resourceToExclude}
          title={texts.delete(hookData.resourceToExclude).title}
          description={texts.delete(hookData.resourceToExclude).description}
          buttons={[
            {
              key: 'delete',
              children: 'Não, cancelar.',
              variant: 'outlined',
              onClick: () => hookData.setResourceIdToExclude('')
            },
            {
              key: 'confirm',
              children: 'Sim, excluir.',
              theme: 'error',
              icon: <Delete />,
              onClick: hookData.handleDeleteResource
            }
          ]}
          handleClickOnClose={() => hookData.setResourceIdToExclude('')}
        />
      )}
    </S.Container>
  )
}
