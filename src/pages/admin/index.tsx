import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, Historico } from '@/components'

export const AdminPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <h2>aqui</h2>
    </div>
  </div>
)
