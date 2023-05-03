import React, { useMemo } from 'react'

import { IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import * as S from './styles'
import { PaginationProps } from './types'
import { Button } from '@/components'

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
      <IconButton onClick={handlePreviousPage} disabled={!hasPreviousPage}>
        <NavigateBefore />
      </IconButton>

      {showInitialHaveMore ? (
        <>
          <Button
            onClick={() => handleSetPageIndex(0)}
            disabled={!hasPreviousPage}
          >
            1
          </Button>

          {isLongerThanSecondPage ? <S.HaveMore>...</S.HaveMore> : null}
        </>
      ) : null}

      <Button disabled>{currentPage}</Button>

      {isBeforeLastPage ? (
        <>
          {showFinalHaveMore ? <S.HaveMore>...</S.HaveMore> : null}

          <Button
            onClick={() => handleSetPageIndex(totalPages - 1)}
            disabled={!hasNextPage}
          >
            {totalPages}
          </Button>
        </>
      ) : null}

      <IconButton onClick={handleNextPage} disabled={!hasNextPage}>
        <NavigateNext />
      </IconButton>
    </S.Pagination>
  )
}
