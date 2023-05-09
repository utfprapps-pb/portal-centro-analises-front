import React from 'react'
import styles from "./styles.module.scss";
import { PlaylistAdd, History, Check, BusinessCenter } from '@material-ui/icons'

export const Menu: React.FC = () => (
  <div className={styles.container}>
    <a className={styles.title} href="/">
      <h1>PORTAL CA</h1>
    </a>
    <section className={styles.tabs}>
      <a className={styles.tab} href="/solicitar">
        <PlaylistAdd style={{ color: '#3f51b5' }} />
        <h2>Solicitar</h2>
      </a>
      <a className={styles.tab} href="/historico">
        <History style={{ color: '#3f51b5' }} />
        <h2>Histórico</h2>
      </a>
      <a className={styles.tab} href="/aprovacoes">
        <Check style={{ color: '#3f51b5' }} />
        <h2>Aprovações</h2>
      </a>
      <a className={styles.tab} href="/projeto">
        <BusinessCenter style={{ color: '#3f51b5' }} />
        <h2>Projetos</h2>
      </a>
    </section>
  </div>
)
