import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, Historico } from '@/components'

export const HistoricoPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Historico />
    </div>
  </div>
)
