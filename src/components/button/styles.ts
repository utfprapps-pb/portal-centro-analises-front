import UIButton from '@material-ui/core/Button'
import styled, { css } from 'styled-components'

import { ButtonTheme } from './theme'

type ButtonProps = {
  buttontheme: ButtonTheme
}

export const Button = styled(UIButton)<ButtonProps>`
  text-transform: inherit !important;
  font-weight: bold !important;
  width: 100%;

  ${({ buttontheme }) =>
    buttontheme.background &&
    css`
      color: ${buttontheme.color} !important;
      background: ${buttontheme.background} !important;

      &:hover {
        background: ${buttontheme.backgroundHover} !important;
      }
    `}

  .MuiButton-label {
    gap: 12px;
  }
`
