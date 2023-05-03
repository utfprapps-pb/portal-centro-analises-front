import { Close } from '@material-ui/icons'
import styled from 'styled-components'

import { Text } from '@/components'
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
  gap: 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 560px;
`

export const Description = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 22px;
`

export const Overlay = styled.div<{ isVisible?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => `${theme.colors.black}4c`};
  z-index: 2;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Title = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`
