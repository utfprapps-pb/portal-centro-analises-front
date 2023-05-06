import { useMemo } from 'react'

import { Tooltip } from '@mui/material'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table'
import { SortAscending, SortDescending } from 'phosphor-react'

import * as S from './styles'
import { TableProps } from './types'
import { Pagination } from '@/components'

export * from './types'

export const Table = <T,>({
  columns,
  data,
  sorting,
  setSorting,
  pagination
}: TableProps<T>) => {
  const { totalPages, paginationTable, setPaginationTable } = pagination

  const {
    getFlatHeaders,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageIndex,
    getState
  } = useReactTable({
    columns,
    data,
    state: {
      pagination: paginationTable,
      sorting
    },
    pageCount: totalPages,
    manualPagination: true,
    onPaginationChange: setPaginationTable,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const currentPage = useMemo(
    () => getState().pagination.pageIndex + 1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getState, paginationTable]
  )

  return (
    <S.Container>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            {getFlatHeaders().map((header) => (
              <S.TableHeadCell
                key={header.id}
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: (
                    <Tooltip title="Ordenar ascendente">
                      <SortAscending />
                    </Tooltip>
                  ),
                  desc: (
                    <Tooltip title="Ordenar decrescente">
                      <SortDescending />
                    </Tooltip>
                  )
                }[header.column.getIsSorted() as string] ?? null}
              </S.TableHeadCell>
            ))}
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {getRowModel().rows.map((row) => (
            <S.TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <S.TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </S.TableBody>

        <S.TableFoot />
      </S.Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={getCanPreviousPage()}
        handlePreviousPage={() => previousPage()}
        hasNextPage={getCanNextPage()}
        handleNextPage={() => nextPage()}
        handleSetPageIndex={setPageIndex}
      />
    </S.Container>
  )
}
