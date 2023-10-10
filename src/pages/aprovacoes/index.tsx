import React from 'react'

import styles from './styles.module.scss'
import {
  Header,
  Menu,
  Aprovacoes,
  AprovacaoSolicitacaoPanel,
  AprovacaoVinculoPanel
} from '@/components'
import Tabs from '@/components/tabs'
import Breadcrumb from '@/components/breadcrumb'

const tabs = [
  {
    title: 'Painel de Aprovações de Solicitação',
    content: <AprovacaoSolicitacaoPanel />
  },
  {
    title: 'Painel de Aprovações de Vínculo',
    content: <AprovacaoVinculoPanel />
  }
]

export const AprovacoesPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <Tabs tabs={tabs} /> {}
    </div>
  </div>
)
