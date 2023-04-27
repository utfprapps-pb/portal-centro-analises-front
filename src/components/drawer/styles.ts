import { Drawer as UIDrawer } from '@material-ui/core/'
import { Close } from '@material-ui/icons/'
import styled from 'styled-components'

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`

export const Drawer = styled(UIDrawer)`
  .MuiDrawer-paper {
    max-width: 400px;
  }

  & .MuiButtonBase-root.MuiButton-contained {
    margin-bottom: 40px;
  }
`
