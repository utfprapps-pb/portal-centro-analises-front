import styled from 'styled-components'

import { Button } from '../button'

export const ButtonGoPage = styled.button<PaginationButtonGoPageProps>`
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: none;
  font-size: ${({ theme }) => theme.fontSizes.b2};
`

export const HaveMore = styled.div`
  display: flex;
  align-items: flex-end;

  margin: 0px 8px;
`

type PaginationButtonGoPageProps = {
  disabled: boolean
}

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PaginationItem = styled(Button)`
  padding: 8px 12px;
  margin: 0 8px;

  font-size: ${({ theme }) => theme.fontSizes.b4};
`
