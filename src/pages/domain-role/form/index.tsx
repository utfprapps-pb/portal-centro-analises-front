import React from 'react'

import styles from './styles.module.scss'
import { Header, Menu } from '@/components'
import { DomainRoleForm } from '@/components/domain-role/form'
import Breadcrumb from '@/components/breadcrumb'

export const DomainRolePage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />

      <Breadcrumb />
      <DomainRoleForm />
    </div>
  </div>
)
