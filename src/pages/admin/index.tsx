import React from 'react'
import styles from './styles.module.scss'
import { Header, Menu, AdminPanel } from '@/components'

export const AdminPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <AdminPanel />
    </div>
  </div>
)
