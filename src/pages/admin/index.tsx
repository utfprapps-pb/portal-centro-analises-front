import React from 'react'
import styles from './styles.module.scss'
import { Header, Menu, AdminPanel } from '@/components'
import Tabs from '../../components/tabs'
import { FinancePanel } from '@/components/finance-panel'
import Breadcrumb from '@/components/breadcrumb'

const tabs = [
  {
    title: 'Painel de Admin',
    content: <AdminPanel />
  },
  {
    title: 'Painel Financeiro',
    content: <FinancePanel />
  }
]

export const AdminPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <Tabs tabs={tabs} /> {}
    </div>
  </div>
)
