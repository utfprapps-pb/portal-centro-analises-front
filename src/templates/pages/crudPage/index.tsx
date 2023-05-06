import React from 'react'

import { IconButton, Tooltip } from '@mui/material'
import { Plus, Trash, Funnel, MagnifyingGlass, X } from 'phosphor-react'

import * as S from './styles'
import { CrudPageProps } from './types'
import { Button, Loading, Modal, Table, Text } from '@/components'
import { Drawer } from '@/components/drawer'
import { Id } from '@/templates/hooks'

export const CrudPage = <
  TTableData extends Id,
  TFormData extends Record<string, unknown>
>(
  props: CrudPageProps<TTableData, TFormData>
) => {
  const { texts, hookData, table, form, title, notFoundResourceName } = props
  const { loading, deleteLoading, getOneLoading, resources } = hookData

  if (loading) {
    return (
      <S.LoadingContainer>
        <Loading size={24} />
      </S.LoadingContainer>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title size="h6">{title}</S.Title>
        </S.HeaderLeft>

        <S.HeaderRight>
          <Tooltip title="Filtros">
            <IconButton>
              <Funnel />
            </IconButton>
          </Tooltip>
          <Button onClick={hookData.createDrawer.open}>
            <Plus /> Adicionar
          </Button>
        </S.HeaderRight>
      </S.Header>

      {resources.length ? (
        <Table<TTableData>
          {...table}
          data={hookData.resources}
          pagination={{
            totalPages: hookData.totalPages,
            paginationTable: hookData.pagination,
            setPaginationTable: hookData.setPagination
          }}
        />
      ) : (
        <S.NotFoundContainer>
          <MagnifyingGlass size={64} />

          <Text size="h6" color="text">
            Nenhum resultado encontrado
          </Text>

          <Text size="b3" color="text">
            Não foram encontrados {notFoundResourceName} para os filtros
            aplicados
          </Text>
        </S.NotFoundContainer>
      )}

      <Drawer
        open={hookData.createDrawer.isOpen}
        onClose={hookData.createDrawer.close}
      >
        {form.renderCreateContainer()}
      </Drawer>

      <Drawer
        open={!!hookData.resourceIdToUpdate}
        onClose={() => hookData.setResourceIdToUpdate('')}
      >
        {!getOneLoading && hookData.resourceToUpdate ? (
          form.renderUpdateContainer(hookData.resourceToUpdate)
        ) : (
          <S.LoadingContainer>
            <Loading size={32} />
          </S.LoadingContainer>
        )}
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
              icon: <X />,
              disabled: deleteLoading,
              onClick: () => hookData.setResourceIdToExclude('')
            },
            {
              key: 'confirm',
              children: 'Sim, excluir.',
              theme: 'error',
              icon: <Trash />,
              loading: deleteLoading,
              disabled: deleteLoading,
              onClick: hookData.handleDeleteResource
            }
          ]}
          handleClickOnClose={() => hookData.setResourceIdToExclude('')}
        />
      )}
    </S.Container>
  )
}
