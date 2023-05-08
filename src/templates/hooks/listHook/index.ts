import { useCallback, useEffect, useMemo, useState } from 'react'

import { PaginationState, SortingState } from '@tanstack/react-table'
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

    const [filters, setFilters] = useState<HttpRequest['filters']>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })

    const currentPage = useMemo(() => pagination.pageIndex + 1, [pagination])
    const currentSort = useMemo(() => sorting[0], [sorting])

    const [totalPages, setTotalPages] = useState(1)

    const fetchResources = useCallback(async () => {
      try {
        const response = await list({
          pagination: {
            page: currentPage
          },
          filters,
          ...(currentSort?.id &&
            currentSort?.desc && {
              sort: {
                field: currentSort.id,
                order: currentSort.desc ? 'desc' : 'asc'
              }
            })
        })

        setResources(response.resources)
        setTotalPages(response.totalPages)
      } catch (error) {
        const axiosError = error as AxiosError

        toast.error(axiosError.message)
      } finally {
        setLoading(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, currentSort, filters])

    useEffect(() => {
      fetchResources()
    }, [fetchResources])

    return {
      currentPage,
      filters,
      loading,
      pagination,
      resources,
      sorting,
      totalPages,
      fetchResources,
      setFilters,
      setLoading,
      setPagination,
      setResources,
      setSorting,
      setTotalPages
    }
  }
