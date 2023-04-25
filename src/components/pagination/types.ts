export type PaginationProps = {
  currentPage: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  handlePreviousPage: () => void
  handleNextPage: () => void
  handleSetPageIndex: (pageIndex: number) => void
}
