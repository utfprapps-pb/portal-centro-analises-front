import React from 'react'

import * as S from './styles'
import { DrawerProps } from './types'

export const Drawer: React.FC<DrawerProps> = ({
  open,
  title,
  children,
  onClose
}) => (
  <S.Drawer open={open} onClose={onClose} anchor="right" title={title}>
    <S.CloseIcon onClick={onClose} />
    {children}
  </S.Drawer>
)
