import React, { useMemo } from 'react'

import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import * as S from './styles'
import { PaginationProps } from './types'

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  handlePreviousPage,
  handleNextPage,
  handleSetPageIndex
}) => {
  const showInitialHaveMore = useMemo(() => currentPage > 2, [currentPage])
  const showFinalHaveMore = useMemo(() => currentPage + 2 > 3, [currentPage])
  const isBeforeLastPage = useMemo(
    () => currentPage + 1 < totalPages,
    [currentPage, totalPages]
  )
  const isLongerThanSecondPage = useMemo(() => currentPage > 2, [currentPage])

  return (
    <S.Pagination>
      <S.ButtonGoPage onClick={handlePreviousPage} disabled={!hasPreviousPage}>
        <NavigateBefore />
      </S.ButtonGoPage>

      {showInitialHaveMore ? (
        <>
          <S.PaginationItem
            onClick={() => handleSetPageIndex(0)}
            disabled={!hasPreviousPage}
          >
            1
          </S.PaginationItem>

          {isLongerThanSecondPage ? <S.HaveMore>...</S.HaveMore> : null}
        </>
      ) : null}

      <S.PaginationItem disabled>{currentPage}</S.PaginationItem>

      {isBeforeLastPage ? (
        <>
          {showFinalHaveMore ? <S.HaveMore>...</S.HaveMore> : null}

          <S.PaginationItem
            onClick={() => handleSetPageIndex(totalPages - 1)}
            disabled={!hasNextPage}
          >
            {totalPages}
          </S.PaginationItem>
        </>
      ) : null}

      <S.ButtonGoPage onClick={handleNextPage} disabled={!hasNextPage}>
        <NavigateNext />
      </S.ButtonGoPage>
    </S.Pagination>
  )
}
