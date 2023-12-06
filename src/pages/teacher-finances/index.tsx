import { Header, Menu, TeacherFinances } from '@/components'

import styles from './styles.module.scss'
import Breadcrumb from '@/components/breadcrumb'

export const TeacherFinancesPage: React.FC = () => (
  <div className={styles.container}>
    <Menu />
    <div className={styles.middle}>
      <Header />
      <Breadcrumb />
      <TeacherFinances />
    </div>
  </div>
)
