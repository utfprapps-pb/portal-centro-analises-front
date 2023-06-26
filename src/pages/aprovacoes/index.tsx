import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, Aprovacoes } from '@/components'

export const AprovacoesPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Aprovacoes />
    </div>
  </div>
)
