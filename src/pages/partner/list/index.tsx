import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, PartnerList } from '@/components'

export const PartnerListPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <PartnerList />
    </div>
  </div>
)
