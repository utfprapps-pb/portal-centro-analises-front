import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu } from '@/components'
import { TransactionForm } from '@/components/transaction/form/TransactionForm'

export const TransactionPageForm: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <TransactionForm />
    </div>
  </div>
)