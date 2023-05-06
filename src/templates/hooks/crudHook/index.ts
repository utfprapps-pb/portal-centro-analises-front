import { useCallback, useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { CrudHookProps } from './types'
import { listDeleteHook } from '../listDeleteHook'
import { Id } from '../types'
import { useModal } from '@/hooks'

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
      services: { create, update, getOne },
      texts: {
        create: { success: createSuccessMessage },
        update: { success: updateSuccessMessage }
      }
    } = params

    const createDrawer = useModal()
    const listDeleteHookData = useListDeleteHook()

    const { fetchResources } = listDeleteHookData

    const [touched, setTouched] = useState(false)
    const [getOneLoading, setGetOneLoading] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const [resourceIdToUpdate, setResourceIdToUpdate] = useState('')
    const [resourceToUpdate, setResourceToUpdate] = useState<TFormData | null>(
      null
    )

    const handleCreateResource = useCallback(
      async (props: { formData: TFormData; formIsValid: boolean }) => {
        try {
          const { formData, formIsValid } = props

          setCreateLoading(true)
          setTouched(true)

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
          setCreateLoading(false)
        }
      },
      [createDrawer, createSuccessMessage, create, fetchResources]
    )

    const handleUpdateResource = useCallback(
      async (props: { formData: TFormData; formIsValid: boolean }) => {
        try {
          const { formData, formIsValid } = props

          setUpdateLoading(true)
          setTouched(true)

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
          setUpdateLoading(false)
        }
      },
      [resourceIdToUpdate, updateSuccessMessage, fetchResources, update]
    )

    useEffect(() => {
      const getOneProject = async () => {
        try {
          setGetOneLoading(true)

          const resource = await getOne(resourceIdToUpdate)
          setResourceToUpdate(resource)
        } catch (error) {
          const axiosError = error as AxiosError
          toast.error(axiosError.message)
        } finally {
          setGetOneLoading(false)
        }
      }

      if (resourceIdToUpdate) getOneProject()
      else setResourceToUpdate(null)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceIdToUpdate])

    return {
      ...listDeleteHookData,
      createDrawer,
      createLoading,
      getOneLoading,
      resourceIdToUpdate,
      resourceToUpdate,
      touched,
      updateLoading,
      handleCreateResource,
      handleUpdateResource,
      setResourceIdToUpdate
    }
  }
}
