import { useCallback, useMemo, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { CrudHookProps } from './types'
import { listDeleteHook } from '../listDeleteHook'
import { Id } from '../types'
import { useHandleValidate, useModal } from '@/hooks'

export * from './types'

export const crudHook = <
  TTableData extends Id,
  TFormData extends Record<string, unknown>
>(
  params: CrudHookProps<TTableData, TFormData>
) => {
  const useListDeleteHook = listDeleteHook<TTableData>({
    services: {
      delete: params.services.delete,
      list: params.services.list
    },
    texts: {
      deleteSuccess: params.texts.delete.success
    }
  })

  return () => {
    const {
      validation,
      services: { create, update },
      texts: {
        create: { success: createSuccessMessage },
        update: { success: updateSuccessMessage }
      }
    } = params

    const handleValidate = useHandleValidate

    const createDrawer = useModal()
    const listDeleteHookData = useListDeleteHook()

    const { resources, setLoading, fetchResources } = listDeleteHookData

    const [resourceIdToUpdate, setResourceIdToUpdate] = useState('')
    const resourceToUpdate = useMemo<TTableData | undefined>(
      () => resources.find(({ id }) => id === resourceIdToUpdate),
      [resourceIdToUpdate, resources]
    )

    const isUpdating = useMemo(
      () => !!resourceToUpdate?.id,
      [resourceToUpdate?.id]
    )

    const handleCreateResource = useCallback(
      async (formData: TFormData) => {
        try {
          setLoading(true)

          const { formIsValid } = handleValidate({
            formData,
            validation
          })

          if (!formIsValid) {
            toast.error('Preencha os dados do formulário corretamente')
            return
          }

          await create(formData)

          createDrawer.close()

          toast.success(createSuccessMessage)

          fetchResources()
        } catch (error) {
          const axiosError = error as AxiosError
          toast.error(axiosError.message)
        } finally {
          setLoading(false)
        }
      },
      [
        createDrawer,
        createSuccessMessage,
        validation,
        create,
        fetchResources,
        handleValidate,
        setLoading
      ]
    )

    const handleUpdateResource = useCallback(
      async (formData: TFormData) => {
        try {
          setLoading(true)

          const { formIsValid } = handleValidate({
            formData,
            validation
          })

          if (!formIsValid) {
            toast.error('Preencha os dados do formulário corretamente')
            return
          }

          await update(resourceIdToUpdate, formData)

          setResourceIdToUpdate('')

          toast.success(updateSuccessMessage)

          fetchResources()
        } catch (error) {
          const axiosError = error as AxiosError
          toast.error(axiosError.message)
        } finally {
          setLoading(false)
        }
      },
      [
        resourceIdToUpdate,
        updateSuccessMessage,
        validation,
        fetchResources,
        handleValidate,
        setLoading,
        update
      ]
    )

    return {
      ...listDeleteHookData,
      createDrawer,
      resourceToUpdate,
      isUpdating,
      handleCreateResource,
      handleUpdateResource,
      setResourceIdToUpdate
    }
  }
}
