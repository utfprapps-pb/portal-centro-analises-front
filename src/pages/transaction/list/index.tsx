import React from 'react'

import { TransactionList } from '../../../components/transaction/list/TransactionList'
import styles from './styles.module.scss'
import { Header, Menu } from '@/components'

export const Transaction: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <TransactionList />
    </div>
  </div>
)