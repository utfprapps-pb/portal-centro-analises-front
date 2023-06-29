import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu, PartnerForm, PartnerList } from '@/components'

export const PartnerPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <PartnerForm />
    </div>
  </div>
)
