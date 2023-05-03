import React from 'react'

import { PlaylistAdd, History, Check, BusinessCenter } from '@material-ui/icons'

import * as S from './styles'

export const Menu: React.FC = () => (
  <S.Container>
    <h1>PORTAL CA</h1>
    <section>
      <a href="/solicitar">
        <PlaylistAdd style={{ color: '#e0bb00' }} />
        <h2>Solicitar</h2>
      </a>
      <a href="/historico">
        <History style={{ color: '#e0bb00' }} />
        <h2>Histórico</h2>
      </a>
      <a href="/aprovacoes">
        <Check style={{ color: '#e0bb00' }} />
        <h2>Aprovações</h2>
      </a>
      <a href="/projeto">
        <BusinessCenter style={{ color: '#e0bb00' }} />
        <h2>Projetos</h2>
      </a>
    </section>
  </S.Container>
)
