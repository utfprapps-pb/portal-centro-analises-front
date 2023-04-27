import { useCallback, useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { ListHookProps } from './types'
import { Id } from '../types'
import { HttpRequest } from '@/services/api/types'

export const listHook =
  <TTableData extends Id>(params: ListHookProps<TTableData>) =>
  () => {
    const {
      services: { list }
    } = params

    const [resources, setResources] = useState<TTableData[]>([])
    const [loading, setLoading] = useState(true)
    // ToDo @Minozzzi: Implementar ordenação para o http client
    // const [sort, setSort] = useState({ field: '', asc: false })
    const [filters, setFilters] = useState<HttpRequest['filters']>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchResources = useCallback(async () => {
      try {
        const response = await list({
          pagination: {
            page: currentPage
          },
          filters
        })

        setResources(response.resources)
        setTotalPages(response.totalPages)
      } catch (error) {
        const axiosError = error as AxiosError

        toast.error(axiosError.message)
      } finally {
        setLoading(false)
      }
    }, [currentPage, filters, list])

    useEffect(() => {
      fetchResources()
    }, [fetchResources])

    return {
      currentPage,
      filters,
      loading,
      resources,
      totalPages,
      fetchResources,
      setCurrentPage,
      setFilters,
      setLoading,
      setResources,
      setTotalPages
    }
  }
