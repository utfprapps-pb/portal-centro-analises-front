import { useCallback, useMemo, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { ListDeleteHookProps } from './types'
import { listHook } from '../listHook'
import { Id } from '../types'

export const listDeleteHook = <TTableData extends Id>(
  params: ListDeleteHookProps<TTableData>
) => {
  const listHookParams = {
    services: {
      list: params.services.list
    }
  }
  const useListHook = listHook(listHookParams)

  return () => {
    const {
      services: { delete: deleteCallback },
      texts: { deleteSuccess }
    } = params

    const listHookData = useListHook()
    const { resources, fetchResources } = listHookData

    const [deleteLoading, setDeleteLoading] = useState(false)

    const [resourceIdToExclude, setResourceIdToExclude] = useState('')
    const resourceToExclude = useMemo<TTableData | undefined>(
      () => resources.find(({ id }) => id === resourceIdToExclude),
      [resourceIdToExclude, resources]
    )

    const handleDeleteResource = useCallback(async () => {
      try {
        setDeleteLoading(true)

        await deleteCallback(resourceIdToExclude)

        setResourceIdToExclude('')

        toast.success(deleteSuccess)

        fetchResources()
      } catch (error) {
        const axiosError = error as AxiosError
        toast.error(axiosError.message)
      } finally {
        setDeleteLoading(false)
      }
    }, [
      deleteSuccess,
      resourceIdToExclude,
      deleteCallback,
      fetchResources,
      setDeleteLoading
    ])

    return {
      ...listHookData,
      deleteLoading,
      resourceToExclude,
      setResourceIdToExclude,
      handleDeleteResource
    }
  }
}
