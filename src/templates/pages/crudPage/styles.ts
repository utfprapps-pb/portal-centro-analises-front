import styled from 'styled-components'

import { Text } from '@/components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  height: 100%;

  table {
    margin-top: 18px;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`

export const HeaderLeft = styled.div`
  display: flex;
`

export const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
`

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;
  text-align: center;

  height: 100%;
`

export const Title = styled(Text)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`
