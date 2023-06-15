import React from 'react'
import styles from './styles.module.scss'
import { Header, Menu, AdminPanel } from '@/components'
import DataTable from '@/components/data-table'

export const AdminPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <AdminPanel />
      <DataTable />
    </div>
  </div>
)
