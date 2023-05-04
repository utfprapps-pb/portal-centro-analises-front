import React from 'react'

import * as S from './styles'
import { Header, Menu } from '@/components'

export const HomePage: React.FC = () => (
  <S.Container>
    <Menu />
    <Header />
  </S.Container>
)
