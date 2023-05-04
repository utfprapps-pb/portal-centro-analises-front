import React from 'react'

import * as S from './styles'
import { Header, Menu, Welcome } from '@/components'

export const HomePage: React.FC = () => (
  <S.Container>
    <Menu />
    <div className='middle'>
      <Header />
      <Welcome />
    </div>
  </S.Container>
)
