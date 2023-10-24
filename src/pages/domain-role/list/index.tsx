import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu } from '@/components'
import { DomainRoleList } from '@/components/domain-role/list'
import Breadcrumb from '@/components/breadcrumb'

export const DomainRoleListPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />

      <Breadcrumb />
      <DomainRoleList />
    </div>
  </div>
)
