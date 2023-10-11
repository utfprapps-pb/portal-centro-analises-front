import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, Solicitar } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

export const SolicitarPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <Solicitar />
    </div>
  </div>
)
