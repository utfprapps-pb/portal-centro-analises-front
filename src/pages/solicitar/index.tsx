import React from 'react'

import * as S from './styles'
import { Header, Menu, Solicitar } from '@/components'

export const SolicitarPage: React.FC = () => (
  <S.Container>
    <Menu />
    <div className='middle'>
      <Header />
      <Solicitar />
    </div>
  </S.Container>
)