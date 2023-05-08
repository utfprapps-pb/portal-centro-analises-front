import { Drawer as UIDrawer } from '@mui/material'
import { X } from 'phosphor-react'
import styled from 'styled-components'

export const CloseIcon = styled(X)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`

export const Drawer = styled(UIDrawer)`
  .MuiDrawer-paper {
    max-width: 400px;
    width: 100%;

    padding: 32px;
  }
`
