import React from 'react'
import styles from "./styles.module.scss";
import { PlaylistAdd, History, Check, BusinessCenter, Adjust, AccountBalance } from '@material-ui/icons'
import { Link } from 'react-router-dom';

export const Menu: React.FC = () => (
  <div className={styles.container}>
    <a className={styles.title} href="/">
      <h1>PORTAL CA</h1>
    </a>
    <section className={styles.tabs}>
      <Link className={styles.tab} to="/solicitar">
      <PlaylistAdd style={{ color: '#3f51b5' }} />
        <h2>Solicitar</h2>
      </Link>
      <Link className={styles.tab} to="/historico">
        <History style={{ color: '#3f51b5' }} />
        <h2>Histórico</h2>
      </Link>
      <Link className={styles.tab} to="/aprovacoes">
        <Check style={{ color: '#3f51b5' }} />
        <h2>Aprovações</h2>
      </Link>
      <Link className={styles.tab} to="/projeto">
        <BusinessCenter style={{ color: '#3f51b5' }} />
        <h2>Projetos</h2>
      </Link>
      <Link className={styles.tab} to="/partner">
        <AccountBalance style={{ color: '#3f51b5' }} />
        <h2>Parceiros</h2>
      </Link>
      <Link className={styles.tab} to="/admin">
        <Adjust style={{ color: '#3f51b5' }} />
        <h2>Admin</h2>
      </Link>
    </section>
  </div>
)
