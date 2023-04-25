import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table'

export type BaseTableProps<T> = Pick<
  TableProps<T>,
  'columns' | 'sorting' | 'setSorting'
>

export type TableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
  pagination: {
    totalPages: number
    paginationTable: PaginationState
    setPaginationTable: OnChangeFn<PaginationState>
  }
}
