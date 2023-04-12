import UIButton from '@material-ui/core/Button'
import styled, { css } from 'styled-components'

import { ButtonTheme } from './theme'

type ContainerProps = {
  buttonTheme: ButtonTheme
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  justify-content: center;

  ${({ buttonTheme }) =>
    buttonTheme.background &&
    css`
      button {
        color: ${buttonTheme.color};
        background: ${buttonTheme.background};

        &:hover {
          background: ${buttonTheme.backgroundHover};
        }
      }
    `}
`

type ButtonProps = {
  fullWidth?: boolean
}

export const Button = styled(UIButton)<ButtonProps>`
  text-transform: inherit !important;
  font-weight: bold !important;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`
