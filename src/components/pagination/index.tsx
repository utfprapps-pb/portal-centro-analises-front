import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import { CaretLeft, CaretRight } from 'phosphor-react'

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
        <CaretLeft />
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
        <CaretRight />
      </IconButton>
    </S.Pagination>
  )
}
