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
      button {
        color: ${buttontheme.color};
        background: ${buttontheme.background};

        &:hover {
          background: ${buttontheme.backgroundHover};
        }
      }
    `}
`
