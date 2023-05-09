import React from 'react'
import styles from "./styles.module.scss";
import { Header, Menu, Welcome } from '@/components'

export const HomePage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Welcome />
    </div>
  </div>
)
