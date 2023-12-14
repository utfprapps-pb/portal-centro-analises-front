import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, TechnicalReportList } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

export const TechnicalReportListPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <TechnicalReportList />
    </div>
  </div>
)
