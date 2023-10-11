import React from 'react'

import { ProjectPage } from './ProjectPage'
import styles from './styles.module.scss'
import { Header, Menu } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

export const Project: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <ProjectPage />
    </div>
  </div>
)
