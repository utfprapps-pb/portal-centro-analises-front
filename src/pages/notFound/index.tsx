import React from 'react'
import styles from "./styles.module.scss";
import { Header, Menu } from '@/components'
import { Error404 } from '@/components/not-found';

export const NotFound: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Error404 />
    </div>
  </div>
)
