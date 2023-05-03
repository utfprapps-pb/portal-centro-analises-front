import styled from 'styled-components'

import { darken, lighten } from '@/utils'

export const Action = styled.div<{
  color: string
  background: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  gap: 8px;
  padding: 12px;
  width: 100%;

  font-size: ${({ theme }) => theme.fontSizes.b4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ color }) => color};
  background-color: ${({ background }) => background};

  &:hover {
    background-color: ${({ background }) =>
      darken({
        color: background,
        percentage: 0.1
      })};
  }

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) => lighten({ color: theme.colors.black, percentage: 0.2 })};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.b2};
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 120px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
