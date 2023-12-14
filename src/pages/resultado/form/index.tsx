import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, TechnicalReportForm } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

export const TechnicalReportPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <TechnicalReportForm />
    </div>
  </div>
)
