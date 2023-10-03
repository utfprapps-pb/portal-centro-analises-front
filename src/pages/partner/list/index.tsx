import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, PartnerList } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

export const PartnerListPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <PartnerList />
    </div>
  </div>
)
