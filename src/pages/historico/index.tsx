import { Header, Menu, Historico } from '@/components'

import styles from './styles.module.scss'
import Breadcrumb from '@/components/breadcrumb'

export const HistoricoPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <Historico />
    </div>
  </div>
)
