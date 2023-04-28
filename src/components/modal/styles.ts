import { Close } from '@material-ui/icons'
import styled from 'styled-components'

import { Text } from '../text'
import { lighten } from '@/utils'

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  gap: 12px;

  ${({ theme }) => theme.media.forPhoneOnly} {
    flex-direction: column-reverse;
  }
`

export const CloseIcon = styled(Close)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px;
`

export const Container = styled.div`
  position: relative;
  z-index: 1;

  cursor: default;
  background: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 28px;
  margin: 10px;
  width: 100%;
  max-width: 560px;
`

export const Description = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`

export const Overlay = styled.div<{ isVisible?: boolean }>`
  position: absolute;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  cursor: pointer;
  background: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.8 })};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

export const Title = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`
