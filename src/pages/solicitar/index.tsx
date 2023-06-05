import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, Solicitar } from '@/components'

export const SolicitarPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Solicitar />
    </div>
  </div>
)
